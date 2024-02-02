import { accountVerificationValidator, loginValidator, newPasswordValidator, passwordResetValidator, signupValidator, verificationForPasswordResetValidator } from "../validators/auth-validators";
import { generateAccountVerificationToken, generatePasswordResetToken, verifyAccountVerificationToken, verifyPasswordResetToken } from "../utils/token-utils";
import { accountVerificationCookie, passwordResetCookie, sessionIdCookie } from "../constants/cookies-constants";
import { emailMethodSlug, googleMethodSlug } from "../constants/signup-methods-constants";
import { successResponse, errorResponse, handleError } from '../utils/controller-utils';
import { AccountVerificationMail } from "../mail-template/account-verification-mail";
import { comparePlainTextToHashedText, hash } from "../utils/hash-utils";
import { createSession, leaveSession } from "../utils/session-utils";
import PasswordResetMail from "../mail-template/password-reset-mail";
import { generateRandomCode } from "../utils/code-utils";
import { sendMail } from "../utils/mail-utils";
import { render } from "@react-email/render";
import { Request, Response } from 'express';
import { prisma } from "../config";
import axios from "axios";


//
export const login = async (req: Request, res: Response) => {
  try {
    const reqBody = await req.body;
    const { email, password } = await loginValidator.validate(reqBody);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return errorResponse({ res, message: "Email incorect" });
    }
    const isPasswordValid = comparePlainTextToHashedText(
      password,
      user.passwordHash!
    );
    if (!isPasswordValid) {
      return errorResponse({ res, message: "Mot de passe incorect" });
    }

    const sessionId = await createSession(user.id);
    res.cookie(sessionIdCookie.name, sessionId, sessionIdCookie.options);

    return successResponse({ res, message: "Connexion réussie" });

  } catch (error: any) {
    return handleError({ res, error });
  }

};

//
export const logout = async (req: Request, res: Response) => {
  try {
    const session = req.body.session;

    await leaveSession(session.sessionToken);

    // Effacez le cookie de session
    res.clearCookie(sessionIdCookie.name, {
      ...sessionIdCookie.options,
    });

    return successResponse({ res, message: "Déconnexion réussie" });

  } catch (error) {
    return handleError({ res, error });
  }
};

//
export const signup = async (req: Request, res: Response) => {
  try {
    const reqBody = await req.body;
    let userData = await signupValidator.validate(reqBody);
    const { email, password, firstName, lastName, accountType } = userData;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return errorResponse({ res, message: "Cet utilisateur existe déjà" });
    }

    const hashedPassword = hash(password);
    const plainCode = generateRandomCode();
    const hashedCode = hash(plainCode);

    const newUser = await prisma.user.create({
      data: {
        signupMethod: emailMethodSlug,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        email,
      },
    });

    const accountVerification = await prisma.accountVerification.create({
      data: {
        userName: firstName + " " + lastName,
        password: hashedPassword,
        accountType: accountType,
        createdAt: new Date(),
        firstName: firstName,
        lastName: lastName,
        userId: newUser.id,
        code: hashedCode,
        verified: false,
        attempt: 1,
      },
    });

    const accountVerificationToken = generateAccountVerificationToken(
      accountVerification.id
    );
    try {
      await sendMail({
        subject: "Vérification de votre compte",
        to: newUser.email!,
        html: render(AccountVerificationMail({ verificationCode: plainCode })),
      });
      res.cookie(accountVerificationCookie.name, accountVerificationToken, accountVerificationCookie.options)
      return successResponse({ res, message: "Un code vous a été envoyé" });

    } catch (error) {
      return errorResponse({ res, message: "Erreur lors de l'envoi du mail : " + error });
    }
  } catch (error: any) {
    return handleError({ res, error });
  }
};

//
export const accountVerification = async (req: Request, res: Response) => {
  try {
    const accountVerificationToken = req.cookies[accountVerificationCookie.name];
    console.log(accountVerificationToken);
    const reqBody = req.body;
    const userData = await accountVerificationValidator.validate({
      code: reqBody.code,
      token: accountVerificationToken,
    });

    const { id } = verifyAccountVerificationToken(userData.token);
    const accountVerification = await prisma.accountVerification.findUnique({
      where: {
        id,
      },
    });

    if (!accountVerification) {
      return errorResponse({ res, message: "Account Verification Not Found" });
    }

    if (accountVerification.verified === true) {
      return errorResponse({ res, message: "Ce compte est déja vérifié" });
    }

    if (accountVerification.attempt === 5) {
      return errorResponse({ res, message: "Vous avez atteint la limite de tentative" });
    }

    const codeIsValid = comparePlainTextToHashedText(
      userData.code,
      accountVerification.code
    );

    if (!codeIsValid) {
      await prisma.accountVerification.update({
        where: {
          id,
        },
        data: {
          attempt: {
            increment: 1,
          },
        },
      });

      return errorResponse({ res, message: "Code incorrect" });
    }

    await prisma.accountVerification.update({
      where: {
        id,
      },
      data: {
        attempt: {
          increment: 1,
        },
        verifiedAt: new Date(),
        verified: true,
      },
    });

    await prisma.user.update({
      where: {
        id: accountVerification.userId,
      },
      data: {
        userName: accountVerification.userName,
        verifiedAt: new Date(),
        active: true,
      },
    });

    if (accountVerification.accountType == "CANDIDAT") {
      await prisma.candidat.create({
        data: {
          userId: accountVerification.userId
        }
      });
    } else {
      await prisma.entreprise.create({
        data: {
          userId: accountVerification.userId
        }
      });
    }

    const sessionId = await createSession(accountVerification.userId);

    res.clearCookie(accountVerificationCookie.name);

    res.cookie(sessionIdCookie.name, sessionId, sessionIdCookie.options);

    return successResponse({ res, message: "Code vérifié, inscription terminée" });

  } catch (error: any) {
    return handleError({ res, error });
  }
};

//
export const passwordReset = async (req: Request, res: Response) => {
  try {

    const reqBody = await req.body;
    const { email } = await passwordResetValidator.validate(reqBody);

    const user = await prisma.user.findUnique({
      where: {
        email,
        active: true,
      },
    });

    if (user === null) {
      return errorResponse({ res, message: "L'adresse mail ne correspond à aucun utilisateur" });
    }
    const plainCode = generateRandomCode();
    const hashedCode = hash(plainCode);
    const passwordReset = await prisma.passwordReset.create({
      data: {
        code: hashedCode,
        userId: user.id,
        attempt: 1,
        codeVerified: false,
        ip: "ip",
        reset: false,
        createdAt: new Date(),
      },
    });
    const passwordResetToken = generatePasswordResetToken(passwordReset.id);

    await sendMail({
      subject: "Réinitialiser votre mot de passe",
      to: user.email!,
      html: render(PasswordResetMail({ verificationCode: plainCode })),
    });
    res.cookie(passwordResetCookie.name, passwordResetToken, passwordResetCookie.options);

    return successResponse({ res, message: "Un code de réinitialisation a été envoyé par e-mail" });

  } catch (error: any) {

    return handleError({ res, error });

  }
};

//
export const verificationForPasswordReset = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const passwordResetToken = req.cookies[passwordResetCookie.name];
    const { code, token } = await verificationForPasswordResetValidator.validate({
      code: reqBody.code,
      token: passwordResetToken,
    });

    const { id } = verifyPasswordResetToken(token);

    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        id,
      },
    });

    if (!passwordReset) {
      return errorResponse({ res, message: "Not found" });
    }

    if (passwordReset.codeVerified) {
      return errorResponse({ res, message: "Déjà vérifié" });
    }

    if (passwordReset.attempt === 5) {
      return errorResponse({ res, message: "Nombre maximum d'essais atteint" });
    }

    const codeIsValid = comparePlainTextToHashedText(code, passwordReset.code);

    if (!codeIsValid) {
      await prisma.passwordReset.update({
        where: {
          id,
        },
        data: {
          attempt: {
            increment: 1,
          },
        },
      });

      return errorResponse({ res, message: "Code incorrect" });

    }

    await prisma.passwordReset.update({
      where: {
        id,
      },
      data: {
        codeVerified: true,
        codeVerifiedAt: new Date(),
        attempt: {
          increment: 1,
        },
      },
    });

    return successResponse({ res, message: "Vérifié" });

  } catch (error) {
    return handleError({ res, error });
  }
};

//
export const newPassword = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const passwordResetToken = req.cookies[passwordResetCookie.name];

    let { newPassword, token } = await newPasswordValidator.validate({
      newPassword: reqBody.newPassword,
      token: passwordResetToken,
    });

    const { id } = verifyPasswordResetToken(token);
    newPassword = hash(newPassword);

    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        id,
      },
    });

    if (!passwordReset) {
      return errorResponse({ res, message: "Not found" });
    }

    if (!passwordReset.codeVerified) {
      return errorResponse({ res, message: "Code not verified" });
    }

    if (passwordReset.reset) {
      return errorResponse({ res, message: "Déjà réinitialisé" });
    }

    await prisma.passwordReset.update({
      where: {
        id,
      },
      data: {
        reset: true,
        resetAt: new Date(),
      },
    });

    const user = await prisma.user.update({
      where: {
        id: passwordReset.userId,
      },
      data: {
        passwordHash: newPassword,
      },
    });

    const sessionId = await createSession(user.id);

    // Effacez le cookie passwordResetCookie
    res.clearCookie(passwordResetCookie.name);

    // Définissez le cookie de session
    res.cookie(sessionIdCookie.name, sessionId, sessionIdCookie.options);

    return successResponse({ res, message: "Mot de passe réinitialisé avec succès" });

  } catch (error) {
    return handleError({ res, error });
  }
};

//
export const googleAuth = async (req: Request, res: Response) => {
  const accessToken = req.query.accessToken as string;

  try {
    const { data: payload } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!payload?.verified_email) {
      throw new Error("Erreur d'authentification Google");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
        active: true,
      },
    });

    if (user !== null) {
      const sessionId = await createSession(user.id);

      // Définissez le cookie de session
      res.cookie(sessionIdCookie.name, sessionId, sessionIdCookie.options);
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          active: true,
          signupMethod: googleMethodSlug,
        },
      });

      const sessionId = await createSession(newUser.id);

      // Définissez le cookie de session
      res.cookie(sessionIdCookie.name, sessionId, sessionIdCookie.options);
    }

    return res.json({ message: "Connexion réussie" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Erreur d'authentification Google" });
  }
};
