/** Opens Gmail's "new message" window in the browser with the address filled in, instead of the desktop mail app. */
export function gmailCompose(email: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

/** Opens a WhatsApp chat with this number (international format, e.g. "+8801XXXXXXXXX"). */
export function whatsappUrl(number: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

/** Shows a Bangladeshi number in its usual grouping, e.g. "+8801XXXXXXXXX" as "+880 1XXX-XXXXXX". */
export function formatPhone(number: string): string {
  return number.replace(/^\+880(\d{4})(\d{6})$/, "+880 $1-$2");
}
