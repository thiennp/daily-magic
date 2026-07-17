import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eTestAccountSignIn: ShowcaseArticle = {
  slug: "e2e-test-account-sign-in",
  title: "E2E: Sign in with a test account",
  subtitle:
    "test*@agentwitch.com addresses skip email and use SECRET-backed test login.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 2,
  whatYouNeed: [
    "SECRET configured on the server",
    "A test*@agentwitch.com email",
  ],
  tryNext: { label: "Open sign in", href: "/login" },
  sections: [
    {
      paragraphs: [
        "Automated runs use POST /api/auth/test-login so no Resend email is sent. The login form reads the email field value directly so browser automation and autofill stay reliable.",
      ],
      image: {
        src: "/showcases/e2e/01-login.png",
        alt: "Sign-in page with test email filled in",
        caption: "Login screen used in E2E auth scenarios.",
      },
    },
  ],
};

export default e2eTestAccountSignIn;
