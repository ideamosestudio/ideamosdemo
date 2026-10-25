import Home from "../page";
import TestPhoneGLB from "./TestPhoneGLB";
import TestTabletGLB from "./TestTabletGLB";

export default function TestHome() {
  return (
    <div className="test-experiment-page">
      <Home />
      <TestTabletGLB />
      <TestPhoneGLB />
    </div>
  );
}
