declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_KEY: string;
    readonly NEXT_PUBLIC_AUTH_DOMAIN: string;
    readonly NEXT_PUBLIC_PROJECT_ID: string;
    readonly NEXT_PUBLIC_STORAGE_BUCKET: string;
    readonly NEXT_PUBLIC_MESSAGING_SENDERID: string;
    readonly NEXT_PUBLIC_APP_ID: string;
  }
}
