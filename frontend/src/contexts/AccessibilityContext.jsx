import {
  createContext,
  useEffect,
  useState
} from "react";

export const AccessibilityContext =
  createContext();

export const AccessibilityProvider = ({
  children
}) => {
  const [settings, setSettings] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "accessibility_settings"
        );

      return saved
        ? JSON.parse(saved)
        : {
            highContrast: false,
            fontScale: 1,
            reducedMotion: false,
            dyslexiaFont: false,
            extendedTimeouts: true
          };
    });

  useEffect(() => {
    localStorage.setItem(
      "accessibility_settings",
      JSON.stringify(settings)
    );

    document.body.classList.toggle(
      "high-contrast",
      settings.highContrast
    );

    document.body.classList.toggle(
      "reduced-motion",
      settings.reducedMotion
    );

    document.body.classList.toggle(
      "dyslexia-font",
      settings.dyslexiaFont
    );

    document.documentElement.style.fontSize =
      `${settings.fontScale * 100}%`;
  }, [settings]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setSettings
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};