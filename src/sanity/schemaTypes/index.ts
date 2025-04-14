import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./productType";
import { categoryType } from "./categoryType";
import { collectionType } from "./collectionType";
import { brandType } from "./brandType";
import { sizeType } from "./sizeType";
import { colorType } from "./colorType";
import { designerType } from "./designerType";
import { seasonType } from "./seasonType";
import { genderType } from "./genderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    categoryType,
    collectionType,
    brandType,
    sizeType,
    colorType,
    designerType,
    seasonType,
    genderType,
  ],
};
