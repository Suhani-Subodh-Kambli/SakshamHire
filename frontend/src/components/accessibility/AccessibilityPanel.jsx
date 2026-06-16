import { useContext } from "react";

import {
  AccessibilityContext
} from "../../contexts/AccessibilityContext";

import AccessibilityToggle from "./AccessibilityToggle";

import styles from "./AccessibilityPanel.module.css";

function AccessibilityPanel() {
  const {
    settings,
    setSettings
  } = useContext(
    AccessibilityContext
  );

  return (
    <section
      className={styles.panel}
      aria-label="Accessibility Settings"
    >
      <h2>
        Accessibility Settings
      </h2>

      <AccessibilityToggle
        label="High Contrast Mode"
        checked={
          settings.highContrast
        }
        onChange={() =>
          setSettings({
            ...settings,
            highContrast:
              !settings.highContrast
          })
        }
      />

      <AccessibilityToggle
        label="Reduced Motion"
        checked={
          settings.reducedMotion
        }
        onChange={() =>
          setSettings({
            ...settings,
            reducedMotion:
              !settings.reducedMotion
          })
        }
      />

      <AccessibilityToggle
        label="Dyslexia Font"
        checked={
          settings.dyslexiaFont
        }
        onChange={() =>
          setSettings({
            ...settings,
            dyslexiaFont:
              !settings.dyslexiaFont
          })
        }
      />

      <label htmlFor="fontScale">
        Font Size
      </label>

      <input
        id="fontScale"
        type="range"
        min="1"
        max="2"
        step="0.1"
        value={
          settings.fontScale
        }
        onChange={(e) =>
          setSettings({
            ...settings,
            fontScale:
              Number(
                e.target.value
              )
          })
        }
      />

      <p>
        Current Scale:
        {" "}
        {Math.round(
          settings.fontScale *
            100
        )}
        %
      </p>
    </section>
  );
}

export default AccessibilityPanel;