import { SquareCheck } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { Toaster } from './components/ui/toaster';
import { useToast } from './components/ui/use-toast';
import { ConfigProvider, useConfiguration } from './Config';
import ConfigDialog from './Config/Dialog';
import { RemoteKey } from './Remote/constants';
import RemoteKeyLabel from './Remote/RemoteKeyLabel';
import useRemoteKey from './Remote/useRemoteKey';
import { SponsorBlockProvider } from './SponsorBlock';
import SponsorBlockOverlay from './SponsorBlock/SponsorBlockOverlay';
import useAdBlock from './useAdBlock';

// useGlobalKeyBindings sets up the global key bindings for the application.
//
// DO NOT bind the YELLOW and BLUE keys globally as they are used by YouTube on certain pages.
const useGlobalKeyBindings = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { toggleConfig } = useConfiguration();
  const { toast } = useToast();

  useRemoteKey(RemoteKey.GREEN, useCallback(() => {
    setIsConfigOpen(prev => !prev);
    return true;
  }, []));

  useRemoteKey(RemoteKey.RED, useCallback(() => {
    if (toggleConfig('sponsorBlockAutoSkip')) {
      toast({ description: <><SquareCheck className="inline-block h-4 w-4 text-primary" /> Turned on Auto Skip</> });
    }
    else {
      toast({ description: <><SquareCheck className="inline-block h-4 w-4 text-muted" /> Turned off Auto Skip</> });
    }
    return true;
  }, [toast, toggleConfig]));

  // show initial toast messages for global key bindings
  useEffect(() => {
    setTimeout(() => {
      toast({ description: <>Press <RemoteKeyLabel remoteKey={RemoteKey.GREEN} /> on your remote to open the Settings.</> });
      toast({ description: <>Press <RemoteKeyLabel remoteKey={RemoteKey.RED} /> to toggle on/off automatically skipping SponsorBlock segments.</> });
    }, 5000);
  }, [toast]);

  return { isConfigOpen, setIsConfigOpen };
};

const App = () => {
  const { isConfigOpen, setIsConfigOpen } = useGlobalKeyBindings();
  useAdBlock();

  return (
    <>
      <ConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />
      <SponsorBlockOverlay />
    </>
  );
};

export default () => (
  <ConfigProvider>
    <SponsorBlockProvider>
      <Toaster />
      <App />
    </SponsorBlockProvider>
  </ConfigProvider>
);
