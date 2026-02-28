function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramNotification({
  name,
  contact,
  source,
  quizAnswers,
}: {
  name: string;
  contact: string;
  source: string;
  quizAnswers?: Record<string, string>;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = process.env.TELEGRAM_CHAT_IDS;

  if (!token || !chatIds) return;

  const sourceLabel =
    source === "parents"
      ? "для родителей"
      : source === "adults"
      ? "для взрослых"
      : "блог";

  let answersText = "";
  if (quizAnswers && Object.keys(quizAnswers).length > 0) {
    const lines = Object.entries(quizAnswers)
      .map(([k, v]) => `— ${escapeHtml(k)}: ${escapeHtml(v)}`)
      .join("\n");
    answersText = `\n\n📝 Ответы на квиз:\n${lines}`;
  }

  // Generate a simple sales tip based on source and answers
  let tip = "";
  if (source === "parents") {
    const timePressure = quizAnswers?.time_pressure || "";
    const grade = quizAnswers?.grade || "";
    if (timePressure.includes("Очень срочно") || grade === "11 класс") {
      tip = "Клиент в срочной ситуации — предложите ближайшее время для встречи.";
    } else {
      tip = "Родитель хочет помочь ребёнку с выбором — выясните про ребёнка и его интересы.";
    }
  } else if (source === "adults") {
    const situation = quizAnswers?.situation || "";
    if (situation.includes("выгораю")) {
      tip = "Человек выгорает — покажите, что понимаете эту ситуацию изнутри.";
    } else {
      tip = "Клиент ищет смысл и направление — расскажите про свою историю.";
    }
  } else {
    tip = "Читатель блога — уточните, какая статья заинтересовала и что ищет.";
  }

  const text = `🔔 <b>Новая заявка!</b>

👤 Имя: <b>${escapeHtml(name)}</b>
📞 Контакт: <b>${escapeHtml(contact)}</b>
📄 Страница: ${sourceLabel}${answersText}

💡 <b>Как продавать:</b> ${tip}`;

  const ids = chatIds.split(",").map((id) => id.trim());

  await Promise.all(
    ids.map((id) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: id,
          text,
          parse_mode: "HTML",
        }),
      })
    )
  );
}
