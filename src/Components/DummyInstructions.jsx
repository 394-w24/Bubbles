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
          detergent that's suitable into the detergent drawer or directly into
          the drum, depending on your machine's design.
        </li>
        <li>
          <b>Temperature Control:</b> The "Delicates" setting is likely to use
          colder water, which would generally be safe for garments that require
          washing below 30 degrees Celsius. Always consult the machine's user
          manual for specific instructions, as it will provide the most accurate
          guidance for the settings on your particular model. If you no longer
          have the manual, manufacturers often have digital copies available on
          their websites.
        </li>
        <li>
          <b>Start the Machine:</b> Press and hold the "Start" button until the
          machine begins the cycle. The "Start" button is on the far right of
          the control panel, indicated by a play symbol (a right-pointing
          triangle) or simply says "Start". You may need to hold it for a few
          seconds. If the machine does not start, make sure the door is closed
          properly, and that the machine is plugged in and functional. If
          problems persist, refer to the user manual for troubleshooting or
          contact the manufacturer's customer service for assistance.
        </li>
      </ol>
    </div>
  );
};

export default DummyInstructions;
