import { eventType } from "./eventType";
import { postType } from "./postType";
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
import { separatorType } from "./fields/separatorType";
import { textBlockType } from "./fields/textBlockType";
import { eventsType } from "./blocks/eventsType";
import { postsType } from "./blocks/postsType";
import { seoType } from "./seoType";
import { socialType } from "./socialType";
import { teamType } from "./blocks/teamType";
import { teamMemberType } from "./teamMemberType";
import { priceType } from "./priceType";

const schemaTypes = [
  eventType,
  postType,
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
  priceType,
  inputType,
  textareaType,
  selectType,
  checkboxType,
  separatorType,
  textBlockType,
  eventsType,
  postsType,
  seoType,
  teamType,
  teamMemberType,
];

export default schemaTypes;
