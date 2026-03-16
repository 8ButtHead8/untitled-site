import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TELEGRAM_URL, TELEGRAM_HANDLE } from "@/data/constants";

export const metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных на сайте moy-proforientolog.ru",
  robots: { index: false },
};

const sections = [
  {
    title: "1. Оператор персональных данных",
    content: `Оператором персональных данных является Жукова Светлана Александровна, самозанятая (далее — «Оператор»), осуществляющая деятельность по профессиональной ориентации на сайте moy-proforientolog.ru.

Контактный e-mail: sveta_zhukova@mail.ru
Telegram: ${TELEGRAM_HANDLE}`,
  },
  {
    title: "2. Цели обработки персональных данных",
    content: `Оператор обрабатывает персональные данные исключительно в следующих целях:

— организация консультаций по профессиональной ориентации;
— связь с пользователем по оставленной заявке;
— ответы на вопросы, направленные через форму обратной связи.`,
  },
  {
    title: "3. Перечень обрабатываемых персональных данных",
    content: `При оставлении заявки через форму на сайте обрабатываются:
— имя пользователя;
— контактные данные: номер телефона или логин мессенджера.

При посещении сайта автоматически могут собираться технические данные:
— IP-адрес;
— тип браузера и устройства;
— страницы и время посещения (в рамках сервиса веб-аналитики).`,
  },
  {
    title: "4. Правовые основания обработки",
    content: `Обработка персональных данных осуществляется на основании:

— согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»);
— исполнения договора об оказании услуг, стороной которого является субъект персональных данных (п. 5 ч. 1 ст. 6 № 152-ФЗ).`,
  },
  {
    title: "5. Передача данных третьим лицам",
    content: `Персональные данные не продаются и не передаются третьим лицам, за исключением:

— платформ обмена сообщениями (Telegram), используемых исключительно для связи с пользователем, соблюдающих собственные политики конфиденциальности;
— случаев, прямо предусмотренных законодательством Российской Федерации.`,
  },
  {
    title: "6. Срок хранения данных",
    content: `Персональные данные, переданные через форму заявки, хранятся в течение 3 (трёх) лет с момента их получения, либо до отзыва согласия пользователем — в зависимости от того, что наступит раньше.

По истечении срока или после отзыва согласия данные уничтожаются.`,
  },
  {
    title: "7. Права субъекта персональных данных",
    content: `В соответствии со ст. 14–17 Федерального закона № 152-ФЗ вы вправе:

— получить сведения о том, обрабатываются ли ваши персональные данные, и получить их копию;
— потребовать уточнения или исправления неточных данных;
— отозвать согласие на обработку персональных данных в любое время;
— потребовать прекращения обработки или уничтожения данных;
— обжаловать действия (бездействие) Оператора в Роскомнадзор (rkn.gov.ru).

Для реализации прав направьте запрос по контактам Оператора. Оператор рассмотрит обращение в течение 30 дней.`,
  },
  {
    title: "8. Файлы cookie и веб-аналитика",
    content: `Сайт использует технические файлы cookie, необходимые для корректной работы. Кроме того, могут использоваться инструменты веб-аналитики, собирающие обезличенные данные о посещаемости.

Пользователь вправе отключить cookie в настройках браузера, однако это может повлиять на работу сайта.`,
  },
  {
    title: "9. Контакты оператора",
    content: `По всем вопросам, связанным с обработкой персональных данных, обращайтесь:

E-mail: sveta_zhukova@mail.ru
Telegram: ${TELEGRAM_HANDLE}
Сайт: moy-proforientolog.ru`,
  },
];

const EMAIL = "sveta_zhukova@mail.ru";

function RichText({ text }: { text: string }) {
  const parts = text.split(new RegExp(`(${TELEGRAM_HANDLE}|${EMAIL})`, "g"));
  return (
    <>
      {parts.map((part, i) => {
        if (part === TELEGRAM_HANDLE) {
          return (
            <a key={i} href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--green)", textDecoration: "underline" }}>
              {TELEGRAM_HANDLE}
            </a>
          );
        }
        if (part === EMAIL) {
          return (
            <a key={i} href={`mailto:${EMAIL}`}
              style={{ color: "var(--green)", textDecoration: "underline" }}>
              {EMAIL}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 32px 96px" }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--amber)", marginBottom: 20,
          }}>
            Юридическая информация
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 400, lineHeight: 1.15,
            color: "var(--green)", marginBottom: 12,
          }}>
            Политика конфиденциальности
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 56 }}>
            Дата последнего обновления: 1 марта 2026 г.
          </p>

          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75, marginBottom: 48 }}>
            Настоящая Политика конфиденциальности регулирует порядок обработки персональных данных пользователей сайта moy-proforientolog.ru в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 500,
                  color: "var(--dark)", marginBottom: 14,
                }}>
                  {s.title}
                </h2>
                <div style={{
                  fontSize: 15, color: "var(--muted)", lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}>
                  <RichText text={s.content} />
                </div>
                <div style={{ marginTop: 24, height: 1, background: "var(--border)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
