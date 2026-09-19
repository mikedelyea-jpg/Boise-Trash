import React, { useMemo } from 'react';
import { buildAllSchemas } from '../utils/seoStructuredData';

export const StructuredData: React.FC = () => {
  const schemas = useMemo(() => buildAllSchemas(), []);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
