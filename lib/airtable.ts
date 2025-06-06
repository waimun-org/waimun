interface AirtableConfig {
  baseId: string;
  tableId: string;
}

export async function createRecord(
  config: AirtableConfig,
  data: Record<string, unknown>,
): Promise<string> {
  const response = await fetch(
    `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: data,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const error = (await response.json()) as unknown;
    console.error(error);

    throw new Error(
      `Failed to save submission to Airtable: ${response.statusText}`,
    );
  }

  const json = (await response.json()) as {
    records: { id: string }[];
  };

  return json.records[0].id;
}

export async function updateRecord(
  config: AirtableConfig,
  recordId: string,
  data: Record<string, unknown>,
) {
  const response = await fetch(
    `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            id: recordId,
            fields: data,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const error = (await response.json()) as unknown;
    console.error(error);

    throw new Error(
      `Failed to update record in Airtable: ${response.statusText}`,
    );
  }
}
