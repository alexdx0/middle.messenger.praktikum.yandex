declare module "*.hbs?raw" {
  const content: string;
  export default content;
}
declare module "*.hbs" {
  const content: (context?: Record<string, unknown>) => string;
  export default content;
}
