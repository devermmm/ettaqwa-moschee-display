import { forwardRef } from "react";

interface QuizQuestion {
  questionBs: string;
  questionDe: string;
  options: { label: string; textBs: string; textDe: string }[];
  correctIndex: number;
}

const questions: QuizQuestion[] = [
  {
    questionBs: "Koliko stubova ima islam?",
    questionDe: "Wie viele Säulen hat der Islam?",
    options: [
      { label: "A", textBs: "3", textDe: "3" },
      { label: "B", textBs: "5", textDe: "5" },
      { label: "C", textBs: "7", textDe: "7" },
      { label: "D", textBs: "4", textDe: "4" },
    ],
    correctIndex: 1,
  },
  {
    questionBs: "Ko je posljednji Poslanik u islamu?",
    questionDe: "Wer ist der letzte Prophet im Islam?",
    options: [
      { label: "A", textBs: "Isa a.s.", textDe: "Isa (a.s.)" },
      { label: "B", textBs: "Musa a.s.", textDe: "Musa (a.s.)" },
      { label: "C", textBs: "Muhammed s.a.v.s.", textDe: "Muhammad (s.a.w.s.)" },
      { label: "D", textBs: "Ibrahim a.s.", textDe: "Ibrahim (a.s.)" },
    ],
    correctIndex: 2,
  },
  {
    questionBs: "Koliko sura ima Kur'an?",
    questionDe: "Wie viele Suren hat der Quran?",
    options: [
      { label: "A", textBs: "99", textDe: "99" },
      { label: "B", textBs: "114", textDe: "114" },
      { label: "C", textBs: "120", textDe: "120" },
      { label: "D", textBs: "86", textDe: "86" },
    ],
    correctIndex: 1,
  },
];

export const quizSlideCount = questions.length * 2; // question + answer per question

interface Props {
  slideIndex: number;
}

const IslamQuizStory = forwardRef<HTMLDivElement, Props>(({ slideIndex }, ref) => {
  const questionIdx = Math.floor(slideIndex / 2);
  const isAnswer = slideIndex % 2 === 1;
  const q = questions[questionIdx];
  const questionNum = questionIdx + 1;

  return (
    <div
      ref={ref}
      style={{
        width: "min(100%, 540px)",
        aspectRatio: "9 / 16",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        containerType: "inline-size",
        background: "radial-gradient(ellipse at 50% 30%, #003d1f 0%, #001a0d 60%, #000d06 100%)",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "10% 8%",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Header badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2%",
            padding: "1.5% 5%",
            background: "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(94,234,212,0.1))",
            borderRadius: 50,
            border: "1px solid rgba(52,211,153,0.3)",
            fontSize: "3cqi",
            fontWeight: 700,
            marginBottom: "6%",
            letterSpacing: "0.1em",
          }}
        >
          🕌 ISLAM QUIZ
        </div>

        {/* Question number */}
        <p
          style={{
            fontSize: "3.5cqi",
            fontWeight: 600,
            opacity: 0.5,
            marginBottom: "3%",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {isAnswer ? `Antwort ${questionNum}/3` : `Pitanje ${questionNum}/3`}
        </p>

        {/* Question text */}
        <p
          style={{
            fontSize: "5cqi",
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: "1.5%",
          }}
        >
          {q.questionBs}
        </p>
        <p
          style={{
            fontSize: "3.8cqi",
            fontWeight: 600,
            lineHeight: 1.3,
            opacity: 0.65,
            fontStyle: "italic",
            marginBottom: "8%",
          }}
        >
          {q.questionDe}
        </p>

        {/* Options */}
        <div style={{ width: "85%", display: "flex", flexDirection: "column", gap: "3%" }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const showCorrect = isAnswer && isCorrect;
            const showWrong = isAnswer && !isCorrect;

            return (
              <div
                key={opt.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4%",
                  padding: "3.5% 5%",
                  borderRadius: 16,
                  border: showCorrect
                    ? "2px solid rgba(52,211,153,0.8)"
                    : showWrong
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(255,255,255,0.15)",
                  background: showCorrect
                    ? "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(52,211,153,0.1))"
                    : showWrong
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.05)",
                  opacity: showWrong ? 0.4 : 1,
                  transition: "all 0.3s",
                }}
              >
                <span
                  style={{
                    fontSize: "3.5cqi",
                    fontWeight: 800,
                    minWidth: "8%",
                    color: showCorrect ? "#34d399" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {opt.label}
                </span>
                <div style={{ textAlign: "left" }}>
                  <span
                    style={{
                      fontSize: "3.5cqi",
                      fontWeight: 600,
                      color: showCorrect ? "#34d399" : "white",
                    }}
                  >
                    {opt.textBs}
                  </span>
                  {opt.textBs !== opt.textDe && (
                    <span
                      style={{
                        fontSize: "2.8cqi",
                        opacity: 0.5,
                        marginLeft: "3%",
                        fontStyle: "italic",
                      }}
                    >
                      {opt.textDe}
                    </span>
                  )}
                </div>
                {showCorrect && (
                  <span style={{ marginLeft: "auto", fontSize: "4cqi" }}>✅</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        {!isAnswer && (
          <p
            style={{
              fontSize: "2.8cqi",
              opacity: 0.4,
              marginTop: "8%",
              fontStyle: "italic",
            }}
          >
            Swipe za odgovor → Wische für die Antwort →
          </p>
        )}

        {/* Footer handle */}
        <p
          style={{
            position: "absolute",
            bottom: "3%",
            fontSize: "2.5cqi",
            opacity: 0.3,
            letterSpacing: "0.1em",
          }}
        >
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

IslamQuizStory.displayName = "IslamQuizStory";

export { questions as quizQuestions };
export default IslamQuizStory;
