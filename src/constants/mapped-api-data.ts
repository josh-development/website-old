import { JSONOutput } from 'typedoc';
import CoreAPI from '../docs/Documentation/core.json';
import SerializeAPI from '../docs/Documentation/serialize.json';
import { APIData } from '../lib/structures/APIData';

export const MAPPED_API_DATA: MappedAPIData = {
  core: new APIData('Core', CoreAPI as JSONOutput.DeclarationReflection),
  serialize: new APIData('Serialize', SerializeAPI as JSONOutput.DeclarationReflection)
};

export interface MappedAPIData {
  core: APIData;
  serialize: APIData;
}
