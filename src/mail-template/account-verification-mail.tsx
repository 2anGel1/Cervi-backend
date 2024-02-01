import { Body, Container, Head, Hr, Html, Preview, Section, Text, Font } from "@react-email/components";
import { BaseMail, box, hr, paragraph, title, code } from "./base-mail";
import * as React from "react";
import Logo from "./logo";

interface AccountVerificationMail {
  verificationCode: string;
}

export const AccountVerificationMail = ({ verificationCode }: AccountVerificationMail) => (
  <BaseMail>
    <Section style={box}>
      <Logo />
      <Hr style={hr} />
      <Text style={{ ...title, marginBottom: 20 }}>Vérification de votre compte</Text>

      <Text style={paragraph}>Votre code est </Text>

      <code style={code}>{verificationCode}</code>
      <Hr style={hr} />
    </Section>
  </BaseMail>
);

export default AccountVerificationMail;
