import React, { createContext, useCallback, useContext, useReducer, useRef } from 'react';

import { Config, load as loadConfig, save as saveConfig } from './service';

type UpdateConfigFn = <K extends keyof Config>(key: K, value: Config[K]) => void;
type ToggleConfigFn = (key: keyof Pick<Config, { [K in keyof Config]: Config[K] extends boolean ? K : never }[keyof Config]>) => boolean;
type ConfigContext = {
  config: Config;
  updateConfig: UpdateConfigFn;
  toggleConfig: ToggleConfigFn;
};

const ConfigContext = createContext<ConfigContext | null>(null);

export const useConfiguration = () => useContext(ConfigContext) as ConfigContext;

export const ConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const config = useRef<Config>(loadConfig());
  const [, forceRender] = useReducer(v => v + 1, 0);

  const updateConfig: UpdateConfigFn = useCallback((key, value) => {
    config.current = { ...config.current, [key]: value };
    saveConfig(config.current);
    forceRender();
  }, []);

  const toggleConfig: ToggleConfigFn = useCallback((key) => {
    const newValue = !config.current[key];
    updateConfig(key, newValue);
    return newValue;
  }, [updateConfig]);

  return (
    <ConfigContext.Provider value={{ config: config.current, updateConfig, toggleConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
