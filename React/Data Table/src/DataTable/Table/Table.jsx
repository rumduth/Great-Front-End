export default function Table({ data, headers }) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            {Object.values(r).map((v) => (
              <td key={v}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
