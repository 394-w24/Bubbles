import "./DummyInstructionsGeneral.css";

const DummyInstructionsGeneral = () => {
  return (
    <div className="dummy-instructions-general">
      <h4>General Instructions</h4>
      <ol>
        <li>
          <b>Power:</b> Ensure the washing machine is plugged in, and turn the
          power on
        </li>
        <li>
          <b>Load the Washing Machine:</b> Open the washing machine lid or door
          and place your cotton garment inside. If it's the first wash and the
          color is deep, make sure to wash it alone.
        </li>
        <li>
          <b>Detergent:</b> Add the correct amount of a high-efficiency laundry
          detergent that's suitable for colored fabrics into the detergent
          drawer or directly into the drum, depending on your machine's design.
        </li>
        <li>
          <b>Extra Options:</b>
          <ul>
            <li>
              <b>Deep Fill:</b> Don't use this option if it is your first wash.
              It shouldn't need extra water.
            </li>
            <li>
              <b>Extra Rinse:</b> This could be a good option to ensure all
              detergent and loose dye are thoroughly rinsed from the garment.
            </li>
          </ul>
        </li>
        <li>
          <b>Start the Machine:</b> Close the lid or door and press the start
          button to begin the wash cycle.
        </li>
        <li>
          <b>Drying:</b> Once the wash is complete, remove the garment. If the
          machine has a dryer, set it to a heat setting and start the drying
          cycle. Otherwise, hang the garment out to air dry.
        </li>
      </ol>
    </div>
  );
};

export default DummyInstructionsGeneral;
