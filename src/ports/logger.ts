export default interface LoggerInterface {
  info(message: any): void
  debug(message: any): void
  log(message: any): void
  warn(message: any): void
  error(message: any): void
}
