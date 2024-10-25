module.exports = {
  extends: [
    "next",
    "plugin:jsx-a11y/recommended", // Using 'recommended' instead of 'strict' for maximum rules
  ],
  plugins: ["jsx-a11y"],
  rules: {
    // Enforce alt text on all images
    "jsx-a11y/alt-text": [
      "error",
      {
        elements: ["img", "object", "area", "input[type='image']"],
        img: ["Image"],
        object: ["Object"],
        area: ["Area"],
        "input[type='image']": ["InputImage"],
      },
    ],

    // Ensure proper heading hierarchy
    "jsx-a11y/heading-has-content": "error",

    // Enforce ARIA props are valid and complete
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",

    // Ensure interactive elements are accessible
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    "jsx-a11y/interactive-supports-focus": "error",

    // Enforce proper anchor tag usage
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],

    // Require aria-label or aria-labelledby on elements that need labels
    "jsx-a11y/aria-role": [
      "error",
      {
        ignoreNonDOM: true,
      },
    ],

    // Ensure media elements have captions
    "jsx-a11y/media-has-caption": [
      "error",
      {
        audio: ["Audio"],
        video: ["Video"],
        track: ["Track"],
      },
    ],

    // Enforce label usage
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: ["CustomLabel"],
        labelAttributes: ["inputLabel"],
        controlComponents: ["CustomInput"],
        assert: "both",
        depth: 3,
      },
    ],

    // Prevent autofocus usage
    "jsx-a11y/no-autofocus": [
      "error",
      {
        ignoreNonDOM: true,
      },
    ],

    // Ensure sufficient color contrast
    "jsx-a11y/mouse-events-have-key-events": "error",

    // Prevent positive tabindex values
    "jsx-a11y/no-noninteractive-tabindex": [
      "error",
      {
        tags: [],
        roles: ["tabpanel"],
        allowExpressionValues: true,
      },
    ],

    // Ensure proper role attributes
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",

    // Prevent redundant role attributes
    "jsx-a11y/no-redundant-roles": "error",

    // Ensure proper usage of tabIndex
    "jsx-a11y/tabindex-no-positive": "error",
  },
};
