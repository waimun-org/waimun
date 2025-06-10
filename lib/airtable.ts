import { env } from "@/lib/env";

interface AirtableConfig {
  baseId: string;
  tableId: string;
}

type CreateRecordResponse = {
  records: Array<{
    id: string;
  }>;
};

export async function createRecord(
  config: AirtableConfig,
  fields: Record<string, unknown>,
): Promise<string> {
  const response = await fetch(
    `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to save submission to Airtable: ${response.statusText}`,
    );
  }

  const data = (await response.json()) as CreateRecordResponse;
  return data.records[0].id;
}

export async function updateRecord(
  config: AirtableConfig,
  recordId: string,
  fields: Record<string, unknown>,
) {
  const response = await fetch(
    `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            id: recordId,
            fields: fields,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update record in Airtable: ${response.statusText}`,
    );
  }
}
