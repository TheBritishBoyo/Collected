import steps from "../data/steps";

function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">How it works</div>
          <h2>Three steps between you and a fair price.</h2>
          <p>
            No tabs, no refreshing ten storefronts at midnight. Collected does
            the hunting so you can do the collecting.
          </p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div className="step" key={step.number}>
              <span className="num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;