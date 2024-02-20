import "./DummyTranslations.css";

const DummyTranslations2 = () => {
  return (
    <div className="dummy-translations">
      <h4>Translations</h4>
      <ul>
        <li>
          <img src="/bleach_all_allow.png" />
          This triangle symbol means that it is safe to use any type of bleach
          on the garment. When you see this symbol on your clothing label, it
          indicates that you can use chlorine bleach or non-chlorine bleach if
          needed
        </li>
        <li>
          <img src="/dry_tumble.png" />
          This symbol is a laundry care symbol that indicates tumble drying is
          allowed. The circle inside the square signifies that the garment can
          be placed in a tumble dryer. The dot inside the circle represents a
          low heat setting. When you see this symbol, it means you can use your
          tumble dryer to dry the item, but you should use a low heat setting to
          do so. High heat could potentially damage the fabric or cause
          shrinkage, so it's important to adhere to this guideline.
        </li>
        <li>
          <img src="/wash_below_30.jpeg" />
          This symbol indicates that the garment should be washed at or below 30
          degrees Celsius. It is a machine wash symbol where the number inside
          the washtub icon specifies the maximum temperature that should be used
          for washing the item. The symbol suggests using a gentle or delicate
          machine wash cycle to prevent damage to the fabric.
        </li>
      </ul>
    </div>
  );
};

export default DummyTranslations2;
