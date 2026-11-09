import { createLandingContent } from '../domain/siteContent';
import { useMediaQuery, MOBILE_QUERY } from './hooks/useMediaQuery';
import { useTheme } from './hooks/useTheme';
import { DesktopLanding } from './layouts/DesktopLanding';
import { MobileLanding } from './layouts/MobileLanding';

const content = createLandingContent();

// Phones get their own layout (bottom tab bar, swipeable products, one plan at a
// time, bottom-sheet checkout), not a squeezed copy of the desktop page.
export function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  return isMobile ? (
    <MobileLanding content={content} theme={theme} />
  ) : (
    <DesktopLanding content={content} theme={theme} />
  );
}
