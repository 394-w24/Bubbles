import "./DummyTranslations.css";

const DummyTranslations = () => {
  return (
    <div className="dummy-translations">
      <h4>Translations</h4>
      <ul>
        <li>
          <img src="/wash_at_or_below_40.png" />
          Wash at or below 40°C or 105°F
        </li>
        <li>
          <img src="/oxygen_bleach.png" />
          Oxygen bleach only
        </li>
        <li>
          <img src="/tumble_dry.png" />
          Tumble dry, med temp
        </li>
        <li>
          <img src="/iron_med_temp.png" />
          Iron, med temp
        </li>
      </ul>
    </div>
  );
};

export default DummyTranslations;
