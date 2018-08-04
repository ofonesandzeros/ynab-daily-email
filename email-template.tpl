<html>
  <p>
    Bryan, here is your daily budget snapshot for:
  </p>
  <h3>{{ today }}</h3>
  {{#each category_groups}}
  <table width="90%">
    <thead>
      <tr>
        <th align="left">{{ name }}</th>
        <th>Budgeted</th>
        <th>Activity</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {{#each categories}}
      <tr>
        <td>{{ name }}</td>
        <td align="right">{{ milli_currency budgeted }}</td>
        <td align="right">{{ milli_currency activity }}</td>
        <td align="right">{{ milli_currency balance }}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
  <br>
  {{/each}}
</html>