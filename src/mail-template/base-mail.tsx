import {
  Body,
  Container,
  Head,
  Html,
  Text,
  Font,
  Section,
} from "@react-email/components";
import * as React from "react";
import Logo from "./logo";

interface BaseMail {
  children: React.ReactNode;
}

export const BaseMail = ({ children }: BaseMail) => (
  <Html>
    <Head>
      <Font
        fontFamily="Kumbh Sans"
        fallbackFontFamily="Verdana"
        // webFont={{
        //   url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
        //   format: "woff2",
        // }}
        // fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Body style={main}>
      <Container style={container}>
        {children}
        <Section>
          <Text style={footer}>
            En route vers l'inconnu (ERVI) Abidjan, Côte d'ivoire &copy;{new Date().getFullYear()}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BaseMail;

export const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

export const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

export const box = {
  padding: "0 48px",
};

export const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

export const title = {
  color: "#1d2424",

  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

export const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

export const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};

export const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
