import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

interface CaptchaProps {
  validateCaptcha: () => void;
  reloadTrigger?: any;
}

export interface CaptchaHandle {
  reloadCaptcha: () => void;
}

const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(
  ({ validateCaptcha, reloadTrigger }, ref) => {
    const [captchaText, setCaptchaText] = useState<string>("");
    const [captchaInput, setCaptchaInput] = useState<string>("");
    const [captchaError, setCaptchaError] = useState<string>("");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const generateCaptcha = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      setCaptchaText(result);
      localStorage.setItem("captchaText", result);
      drawCaptcha(result);
      setCaptchaError("");
      setCaptchaInput("");
    };

    const drawCaptcha = (text: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f2f2f2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "bold 25px Arial";
      ctx.fillStyle = "#000";

      for (let i = 0; i < text.length; i++) {
        const x = 10 + i * 22;
        const y = Math.random() * 10 + 30;
        const angle = Math.random() * 0.3 - 0.15;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
      }

      ctx.strokeStyle = "#777";
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
    };

    useEffect(() => {
      generateCaptcha();
    }, [reloadTrigger]);

    useEffect(() => {
      generateCaptcha();
    }, []);

    useImperativeHandle(ref, () => ({
      reloadCaptcha: generateCaptcha,
    }));

    const validateCaptchaInput = () => {
      if (captchaInput !== captchaText) {
        setCaptchaError("Incorrect CAPTCHA. Please try again.");
        generateCaptcha();
      } else {
        setCaptchaError("");
        validateCaptcha();
      }
    };

    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control form-input-captcha"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            onBlur={validateCaptchaInput}
          />

          <canvas
            ref={canvasRef}
            width={145}
            height={65}
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#f2f2f2",
              display: "block",
              paddingRight: "10px",
              height: "46px",
            }}
          />

          <button
            type="button"
            className="btn btn-white"
            onClick={generateCaptcha}
            style={{
              border: "1px solid #ccd4da",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              lineHeight: "2",
            }}
          >
            <i className="fa fa-refresh" style={{ fontSize: "20px" }}></i>
          </button>

          {captchaError && (
            <p style={{ color: "red", fontSize: "14px" }}>{captchaError}</p>
          )}
        </div>
      </div>
    );
  }
);

export default Captcha;

{
  /* <div>
            <Captcha
              validateCaptcha={() => setIsCaptchaValid(true)}
              reloadTrigger={captchaReload}
            />
          </div> */
}
