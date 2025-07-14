// import fernet from "fernet-browser";

// const FERNET_SECRET = import.meta.env.VITE_FERNET_SECRET || "";

// if (!FERNET_SECRET) {
//   throw new Error("Missing FERNET secret");
// }

// const tokenizer = fernet({ secret: FERNET_SECRET });

// export class Tokenizer {
//   static encode(message: string): string {
//     return tokenizer.encode(message);
//   }

//   static decode(token: string): string {
//     return tokenizer.decode(token);
//   }
// }

// export default Tokenizer;

// // utils/Encryption.ts
// import fernet from "fernet";
// import { Buffer } from "buffer";
// import Environment from "../environment";

// // Ensure Buffer is available in the browser
// if (!(window as any).Buffer) {
//   (window as any).Buffer = Buffer;
// }

// export class Encryption {
//   private static toUTF8 = (message: string): string =>
//     decodeURIComponent(escape(message));

//   private static fernetInstance = new fernet.Secret(
//     Encryption.toUTF8(Environment.FERNET || "")
//   );

//   // 🔥 FIX: Create a new token instance each time for encoding
//   public static encode(message: string): string {
//     const token = new fernet.Token({
//       secret: Encryption.fernetInstance,
//       time: Date.now(),
//     });
//     return token.encode(Encryption.toUTF8(message));
//   }

//   public static decode(encodedToken: string): string {
//     const token = new fernet.Token({
//       secret: Encryption.fernetInstance,
//       token: encodedToken,
//       ttl: 0, // no expiry
//     });
//     return token.decode();
//   }
// }

// export const encode = Encryption.encode;
// export default Encryption;
