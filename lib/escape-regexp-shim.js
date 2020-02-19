/**
 * Replace non-safe characters for RegExp creation
 *
 * For un-secured user input. To help prevent users from doing the RegExp equiv. of SQL-Injection.
 */
String.prototype.escapeRegExp = function () {
  return this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
