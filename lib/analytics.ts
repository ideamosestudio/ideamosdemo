export const GTM_CONTAINER_ID = "GTM-P6RT6W6W";

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Conversiones mejoradas: Google solo recibe valores ya cifrados con SHA-256.
export async function hashedLeadData(email: string, phone: string) {
  try {
    const data: { sha256_email_address?: string; sha256_phone_number?: string } = {};
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail) data.sha256_email_address = await sha256Hex(normalizedEmail);
    const digits = phone.replace(/\D/g, "");
    if (phone.trim().startsWith("+") && digits.length >= 8) data.sha256_phone_number = await sha256Hex(`+${digits}`);
    return Object.keys(data).length ? data : undefined;
  } catch {
    return undefined;
  }
}
