import { DialogProps } from '@radix-ui/react-dialog';
import React, { useCallback } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useRemoteKey } from '@/Remote';
import { RemoteKey } from '@/Remote/constants';
import { SegmentCategoryLabels } from '@/SponsorBlock/constants';
import { SegmentCategory } from '@/SponsorBlock/service';
import useAutoPauseVideo from '@/YouTube/useAutoPauseVideo';

import { useConfiguration } from '.';

const ConfigDialog: React.FC<Omit<DialogProps, 'children'>> = ({ open, onOpenChange, ...props }) => {
  const { config, updateConfig } = useConfiguration();

  // Close the dialog when the back key is pressed
  useRemoteKey(RemoteKey.BACK, 10, useCallback(() => {
    if (!open || !onOpenChange) {
      return false;
    }
    onOpenChange(false);
    return true;
  }, [open, onOpenChange]));

  useAutoPauseVideo(open);

  return (
    <Dialog {...props} open={open} onOpenChange={onOpenChange}>
      <DialogContent autoFocus tabIndex={0}>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          Manage all the settings of the application.
        </DialogDescription>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Checkbox
              id="removeAds"
              checked={config.removeAds}
              onCheckedChange={(newValue) => {
                updateConfig('removeAds', newValue as boolean);
              }}
            />
            <Label htmlFor="removeAds">Remove YouTube Ads</Label>
          </div>

          <div className="flex space-x-2">
            <Checkbox
              id="removeShorts"
              checked={config.removeShorts}
              onCheckedChange={(newValue) => {
                updateConfig('removeShorts', newValue as boolean);
              }}
            />
            <Label htmlFor="removeShorts">Remove YouTube Shorts</Label>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Checkbox
                id="enableSponsorBlock"
                checked={config.enableSponsorBlock}
                onCheckedChange={(newValue) => {
                  updateConfig('enableSponsorBlock', newValue as boolean);
                }}
              />
              <Label htmlFor="enableSponsorBlock">Enable SponsorBlock</Label>
            </div>

            <div className="flex flex-col space-y-2 mx-5">
              <div className="flex space-x-2">
                <Checkbox
                  id="sponsorBlockAutoSkip"
                  checked={config.sponsorBlockAutoSkip}
                  onCheckedChange={(newValue) => {
                    updateConfig('sponsorBlockAutoSkip', newValue as boolean);
                  }}
                />
                <Label htmlFor="sponsorBlockAutoSkip">Automatically skip segments</Label>
              </div>

              {Object.values(SegmentCategory).map(category => (
                <div key={category} className="flex space-x-2">
                  <Checkbox
                    id={`sponsorBlockSkipCategories-${category}`}
                    checked={config.sponsorBlockSkipCategories.includes(category)}
                    onCheckedChange={(newValue) => {
                      if (newValue) {
                        updateConfig('sponsorBlockSkipCategories', [...config.sponsorBlockSkipCategories, category]);
                      }
                      else {
                        updateConfig('sponsorBlockSkipCategories', config.sponsorBlockSkipCategories.filter(c => c !== category));
                      }
                    }}
                  />
                  <Label htmlFor={`sponsorBlockSkipCategories-${category}`}>{`Skip ${SegmentCategoryLabels[category]}`}</Label>
                </div>
              ))}

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDialog;
