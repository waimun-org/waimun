import { eventType } from "./eventType";
import { heroType } from "./blocks/heroType";
import { pageBuilderType } from "./pageBuilderType";
import { pageType } from "./pageType";
import { splitImageType } from "./blocks/splitImageType";
import { headerType } from "./headerType";
import { buttonType } from "./buttonType";
import { footerType } from "./footerType";
import { linkType } from "./linkType";
import { proseType } from "./blocks/proseType";
import { formType } from "./formType";
import { formBuilderType } from "./formBuilderType";
import { inputType } from "./fields/inputType";
import { checkboxType } from "./fields/checkboxType";
import { textareaType } from "./fields/textareaType";
import { selectType } from "./fields/selectType";
import { eventsType } from "./blocks/eventsType";
import { seoType } from "./seoType";
import { socialType } from "./socialType";
import { teamType } from "./blocks/teamType";
import { teamMemberType } from "./teamMemberType";

const schemaTypes = [
  eventType,
  heroType,
  pageBuilderType,
  pageType,
  splitImageType,
  headerType,
  footerType,
  socialType,
  buttonType,
  linkType,
  proseType,
  formType,
  formBuilderType,
  inputType,
  textareaType,
  selectType,
  checkboxType,
  eventsType,
  seoType,
  teamType,
  teamMemberType
];

export default schemaTypes;
