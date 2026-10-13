export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn("navigator.clipboard failed, attempting fallback:", err);
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand("copy");
    textArea.remove();
    return successful;
  } catch (err) {
    console.error("Fallback copy failed:", err);
    return false;
  }
}
