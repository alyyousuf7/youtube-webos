import { JSONPath } from 'jsonpath-plus';

type JSONPathResult = {
  parent: Array<any> | Record<string, any>;
  parentProperty: string;
  value: any;
};

// removeUsingJSONPath is a helper function that removes data from a given JSON object using a JSONPath.
export const removeUsingJSONPath = (json: Record<string, any>, path: string) => {
  const results: JSONPathResult[] = JSONPath({
    path,
    json,
    resultType: 'all',
  });

  if (results.length > 0) {
    console.log('Filtered count:', results.length, path);
  }

  for (const { parent, parentProperty, value } of results) {
    if (Array.isArray(parent)) {
      const i = parent.indexOf(value);
      parent.splice(i, 1);
    }
    else {
      delete parent[parentProperty];
    }
  }
};
