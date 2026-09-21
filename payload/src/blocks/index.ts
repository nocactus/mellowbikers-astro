import { CardGrid } from './CardGrid/config'
import { CtaBanner } from './CtaBanner/config'
import { EventList } from './EventList/config'
import { FaqBlock } from './FaqBlock/config'
import { FormBlock } from './FormBlock/config'
import { Gallery } from './Gallery/config'
import { Hero } from './Hero/config'
import { LogoStrip } from './LogoStrip/config'
import { MapBlock } from './MapBlock/config'
import { MediaBlock } from './MediaBlock/config'
import { MemberGrid } from './MemberGrid/config'
import { RichTextBlock } from './RichTextBlock/config'
import { SeparatorBlock } from './SeparatorBlock/config'
import { SplitContent } from './SplitContent/config'

/**
 * Elk blok dat een redacteur op een pagina mag zetten. Volgorde bepaalt
 * de volgorde in het "Add block" menu, dus de meestgebruikte bovenaan.
 */
export const pageBlocks = [
  Hero,
  RichTextBlock,
  SplitContent,
  CtaBanner,
  CardGrid,
  MediaBlock,
  Gallery,
  FaqBlock,
  EventList,
  MemberGrid,
  FormBlock,
  LogoStrip,
  MapBlock,
  SeparatorBlock,
]
