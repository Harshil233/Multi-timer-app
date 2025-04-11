import React, { useState, useRef, useEffect } from "react";

const TimerForm = ({ addTimer }) => {
  const [name, setName] = useState("");
  const [hrs, setHrs] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const nameRef = useRef(null);
  const hoursRef = useRef(null);
  const minsRef = useRef(null);
  const secsRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleTimeChange = (e, setter, max, nextRef) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = value === "" ? "" : parseInt(value, 10);
      if (value === "" || numValue <= max) {
        setter(value);
        // Move to next input if value has 2 digits
        if (value.length === 2 && nextRef) {
          nextRef.current.focus();
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hoursNum = hrs === "" ? 0 : parseInt(hrs, 10);
    const minsNum = mins === "" ? 0 : parseInt(mins, 10);
    const secsNum = secs === "" ? 0 : parseInt(secs, 10);
    const total = hoursNum * 3600 + minsNum * 60 + secsNum;

    if (!name || total <= 0 || !category) return;

    addTimer({
      id: Date.now().toString(),
      name,
      duration: total,
      remaining: total,
      category,
      status: "Paused",
      halfwayAlert,
      halfwayAlertTriggered: false,
    });

    setName("");
    setHrs("");
    setMins("");
    setSecs("");
    setCategory("");
    setHalfwayAlert(false);
    nameRef.current.focus();
  };

  return (
    <div className="timer-form-container">
      <form onSubmit={handleSubmit} className="timer-form">
        <h2>Add New Timer</h2>

        <div className="form-group">
          <label htmlFor="name">Timer Name</label>
          <input
            id="name"
            ref={nameRef}
            className="form-input"
            type="text"
            placeholder="Enter timer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <div className="time-inputs">
            <div className="time-input-group">
              <input
                ref={hoursRef}
                className="time-input"
                type="text"
                placeholder="00"
                maxLength="2"
                value={hrs}
                onChange={(e) => handleTimeChange(e, setHrs, 99, minsRef)}
              />
              <span className="time-label">Hours</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-input-group">
              <input
                ref={minsRef}
                className="time-input"
                type="text"
                placeholder="00"
                maxLength="2"
                value={mins}
                onChange={(e) => handleTimeChange(e, setMins, 59, secsRef)}
              />
              <span className="time-label">Minutes</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-input-group">
              <input
                ref={secsRef}
                className="time-input"
                type="text"
                placeholder="00"
                maxLength="2"
                value={secs}
                onChange={(e) => handleTimeChange(e, setSecs, 59, categoryRef)}
              />
              <span className="time-label">Seconds</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            ref={categoryRef}
            className="form-input"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            id="halfwayAlert"
            type="checkbox"
            className="checkbox-input"
            checked={halfwayAlert}
            onChange={(e) => setHalfwayAlert(e.target.checked)}
          />
          <label htmlFor="halfwayAlert" className="checkbox-label">
            Alert me halfway through
          </label>
        </div>

        <button type="submit" className="submit-button">
          Add Timer
        </button>
      </form>
    </div>
  );
};

export default TimerForm;
