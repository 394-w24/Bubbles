import "./DummyInstructions.css";

const DummyInstructions = () => {
  return (
    <div className="dummy-instructions">
      <h4>Instructions</h4>
      <ol>
        <li>
          <b>Power:</b> Press the button with the power symbol on it. This is
          the button on the far left in the row of options under "Regular." It's
          indicated by a small circle with a line at the top, which is the
          universal symbol for power. Press this button once to turn on the
          machine
        </li>
        <li>
          <b>Load the Washing Machine:</b> Open the washing machine lid or door
          and place your cotton garment inside.
        </li>
        <li>
          <b>Detergent:</b> Add the correct amount of a high-efficiency laundry
          detergent that's suitable for colored fabrics into the detergent
          drawer or directly into the drum, depending on your machine's design.
        </li>
        <li>
          <b>Temperature Control:</b> Set the temperature dial to 'Warm'. This
          will help remove any residue from manufacturing and will be gentle
          enough to prevent significant dye bleeding.
        </li>
        <li>
          <b>Cycle Type:</b> Choose the 'Normal' cycle for cotton fabrics. This
          cycle will have a combination of washing and spinning phases suitable
          for the fabric's durability.
        </li>
        <li>
          <b>Soil Level:</b> Select 'Medium' soil level. As it's the first wash,
          there's likely only manufacturing residues rather than actual dirt.
        </li>
        <li>
          <b>Extra Options:</b>
          <ul>
            <li>
              <b>Deep Fill:</b> You may opt not to use this feature since you're
              washing the item alone, and it doesn't need extra water.
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
          abstract machine has a dryer, set it to a low or medium heat setting
          and start the drying cycle. Otherwise, hang the garment out to air
          dry.
        </li>
      </ol>
    </div>
  );
};

export default DummyInstructions;
