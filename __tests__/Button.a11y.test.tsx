import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Button } from "../app/components/ui/button";

describe("Button Accessibility", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<Button onClick={() => {}}>Click me</Button>);

    const results = await axe(container, {
      rules: {
        // You can configure specific rules
        "button-name": { enabled: true },
        "color-contrast": { enabled: true },
      },
    });

    expect(results).toHaveNoViolations();
  });

  // You can test specific scenarios
  it("should be accessible when disabled", async () => {
    const { container } = render(
      <Button disabled onClick={() => {}}>
        Disabled button
      </Button>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
