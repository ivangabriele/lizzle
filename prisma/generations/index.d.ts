
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Log
 * 
 */
export type Log = {
  id: string
  wasSolved: boolean
  createdAt: Date
  puzzleId: string
}

/**
 * Model Puzzle
 * 
 */
export type Puzzle = {
  id: string
  fen: string
  moves: string[]
  originalId: string
  rating: number
  source: PuzzleSource
  themes: string[]
  processedAt: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const PuzzleSource: {
  LICHESS: 'LICHESS'
};

export type PuzzleSource = (typeof PuzzleSource)[keyof typeof PuzzleSource]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Logs
 * const logs = await prisma.log.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Logs
   * const logs = await prisma.log.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.log`: Exposes CRUD operations for the **Log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Logs
    * const logs = await prisma.log.findMany()
    * ```
    */
  get log(): Prisma.LogDelegate<GlobalReject>;

  /**
   * `prisma.puzzle`: Exposes CRUD operations for the **Puzzle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Puzzles
    * const puzzles = await prisma.puzzle.findMany()
    * ```
    */
  get puzzle(): Prisma.PuzzleDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.0.0
   * Query Engine version: da41d2bb3406da22087b849f0e911199ba4fbf11
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Log: 'Log',
    Puzzle: 'Puzzle'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PuzzleCountOutputType
   */


  export type PuzzleCountOutputType = {
    logs: number
  }

  export type PuzzleCountOutputTypeSelect = {
    logs?: boolean
  }

  export type PuzzleCountOutputTypeGetPayload<
    S extends boolean | null | undefined | PuzzleCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? PuzzleCountOutputType
    : S extends undefined
    ? never
    : S extends PuzzleCountOutputTypeArgs
    ?'include' extends U
    ? PuzzleCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof PuzzleCountOutputType ? PuzzleCountOutputType[P] : never
  } 
    : PuzzleCountOutputType
  : PuzzleCountOutputType




  // Custom InputTypes

  /**
   * PuzzleCountOutputType without action
   */
  export type PuzzleCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PuzzleCountOutputType
     * 
    **/
    select?: PuzzleCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Log
   */


  export type AggregateLog = {
    _count: LogCountAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  export type LogMinAggregateOutputType = {
    id: string | null
    wasSolved: boolean | null
    createdAt: Date | null
    puzzleId: string | null
  }

  export type LogMaxAggregateOutputType = {
    id: string | null
    wasSolved: boolean | null
    createdAt: Date | null
    puzzleId: string | null
  }

  export type LogCountAggregateOutputType = {
    id: number
    wasSolved: number
    createdAt: number
    puzzleId: number
    _all: number
  }


  export type LogMinAggregateInputType = {
    id?: true
    wasSolved?: true
    createdAt?: true
    puzzleId?: true
  }

  export type LogMaxAggregateInputType = {
    id?: true
    wasSolved?: true
    createdAt?: true
    puzzleId?: true
  }

  export type LogCountAggregateInputType = {
    id?: true
    wasSolved?: true
    createdAt?: true
    puzzleId?: true
    _all?: true
  }

  export type LogAggregateArgs = {
    /**
     * Filter which Log to aggregate.
     * 
    **/
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     * 
    **/
    orderBy?: Enumerable<LogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Logs
    **/
    _count?: true | LogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogMaxAggregateInputType
  }

  export type GetLogAggregateType<T extends LogAggregateArgs> = {
        [P in keyof T & keyof AggregateLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLog[P]>
      : GetScalarType<T[P], AggregateLog[P]>
  }




  export type LogGroupByArgs = {
    where?: LogWhereInput
    orderBy?: Enumerable<LogOrderByWithAggregationInput>
    by: Array<LogScalarFieldEnum>
    having?: LogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogCountAggregateInputType | true
    _min?: LogMinAggregateInputType
    _max?: LogMaxAggregateInputType
  }


  export type LogGroupByOutputType = {
    id: string
    wasSolved: boolean
    createdAt: Date
    puzzleId: string
    _count: LogCountAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  type GetLogGroupByPayload<T extends LogGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogGroupByOutputType[P]>
            : GetScalarType<T[P], LogGroupByOutputType[P]>
        }
      >
    >


  export type LogSelect = {
    id?: boolean
    wasSolved?: boolean
    createdAt?: boolean
    puzzle?: boolean | PuzzleArgs
    puzzleId?: boolean
  }

  export type LogInclude = {
    puzzle?: boolean | PuzzleArgs
  }

  export type LogGetPayload<
    S extends boolean | null | undefined | LogArgs,
    U = keyof S
      > = S extends true
        ? Log
    : S extends undefined
    ? never
    : S extends LogArgs | LogFindManyArgs
    ?'include' extends U
    ? Log  & {
    [P in TrueKeys<S['include']>]:
        P extends 'puzzle' ? PuzzleGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'puzzle' ? PuzzleGetPayload<S['select'][P]> :  P extends keyof Log ? Log[P] : never
  } 
    : Log
  : Log


  type LogCountArgs = Merge<
    Omit<LogFindManyArgs, 'select' | 'include'> & {
      select?: LogCountAggregateInputType | true
    }
  >

  export interface LogDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Log that matches the filter.
     * @param {LogFindUniqueArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LogFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LogFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Log'> extends True ? CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>> : CheckSelect<T, Prisma__LogClient<Log | null >, Prisma__LogClient<LogGetPayload<T> | null >>

    /**
     * Find the first Log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LogFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LogFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Log'> extends True ? CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>> : CheckSelect<T, Prisma__LogClient<Log | null >, Prisma__LogClient<LogGetPayload<T> | null >>

    /**
     * Find zero or more Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs
     * const logs = await prisma.log.findMany()
     * 
     * // Get first 10 Logs
     * const logs = await prisma.log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logWithIdOnly = await prisma.log.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LogFindManyArgs>(
      args?: SelectSubset<T, LogFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Log>>, PrismaPromise<Array<LogGetPayload<T>>>>

    /**
     * Create a Log.
     * @param {LogCreateArgs} args - Arguments to create a Log.
     * @example
     * // Create one Log
     * const Log = await prisma.log.create({
     *   data: {
     *     // ... data to create a Log
     *   }
     * })
     * 
    **/
    create<T extends LogCreateArgs>(
      args: SelectSubset<T, LogCreateArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Create many Logs.
     *     @param {LogCreateManyArgs} args - Arguments to create many Logs.
     *     @example
     *     // Create many Logs
     *     const log = await prisma.log.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LogCreateManyArgs>(
      args?: SelectSubset<T, LogCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Log.
     * @param {LogDeleteArgs} args - Arguments to delete one Log.
     * @example
     * // Delete one Log
     * const Log = await prisma.log.delete({
     *   where: {
     *     // ... filter to delete one Log
     *   }
     * })
     * 
    **/
    delete<T extends LogDeleteArgs>(
      args: SelectSubset<T, LogDeleteArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Update one Log.
     * @param {LogUpdateArgs} args - Arguments to update one Log.
     * @example
     * // Update one Log
     * const log = await prisma.log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LogUpdateArgs>(
      args: SelectSubset<T, LogUpdateArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Delete zero or more Logs.
     * @param {LogDeleteManyArgs} args - Arguments to filter Logs to delete.
     * @example
     * // Delete a few Logs
     * const { count } = await prisma.log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LogDeleteManyArgs>(
      args?: SelectSubset<T, LogDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs
     * const log = await prisma.log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LogUpdateManyArgs>(
      args: SelectSubset<T, LogUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Log.
     * @param {LogUpsertArgs} args - Arguments to update or create a Log.
     * @example
     * // Update or create a Log
     * const log = await prisma.log.upsert({
     *   create: {
     *     // ... data to create a Log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Log we want to update
     *   }
     * })
    **/
    upsert<T extends LogUpsertArgs>(
      args: SelectSubset<T, LogUpsertArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Find one Log that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {LogFindUniqueOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LogFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LogFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Find the first Log that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LogFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__LogClient<Log>, Prisma__LogClient<LogGetPayload<T>>>

    /**
     * Count the number of Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogCountArgs} args - Arguments to filter Logs to count.
     * @example
     * // Count the number of Logs
     * const count = await prisma.log.count({
     *   where: {
     *     // ... the filter for the Logs we want to count
     *   }
     * })
    **/
    count<T extends LogCountArgs>(
      args?: Subset<T, LogCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogAggregateArgs>(args: Subset<T, LogAggregateArgs>): PrismaPromise<GetLogAggregateType<T>>

    /**
     * Group by Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogGroupByArgs['orderBy'] }
        : { orderBy?: LogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LogClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    puzzle<T extends PuzzleArgs = {}>(args?: Subset<T, PuzzleArgs>): CheckSelect<T, Prisma__PuzzleClient<Puzzle | null >, Prisma__PuzzleClient<PuzzleGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Log base type for findUnique actions
   */
  export type LogFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * Filter, which Log to fetch.
     * 
    **/
    where: LogWhereUniqueInput
  }

  /**
   * Log: findUnique
   */
  export interface LogFindUniqueArgs extends LogFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Log base type for findFirst actions
   */
  export type LogFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * Filter, which Log to fetch.
     * 
    **/
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     * 
    **/
    orderBy?: Enumerable<LogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Logs.
     * 
    **/
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Logs.
     * 
    **/
    distinct?: Enumerable<LogScalarFieldEnum>
  }

  /**
   * Log: findFirst
   */
  export interface LogFindFirstArgs extends LogFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Log findMany
   */
  export type LogFindManyArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * Filter, which Logs to fetch.
     * 
    **/
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     * 
    **/
    orderBy?: Enumerable<LogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Logs.
     * 
    **/
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LogScalarFieldEnum>
  }


  /**
   * Log create
   */
  export type LogCreateArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * The data needed to create a Log.
     * 
    **/
    data: XOR<LogCreateInput, LogUncheckedCreateInput>
  }


  /**
   * Log createMany
   */
  export type LogCreateManyArgs = {
    /**
     * The data used to create many Logs.
     * 
    **/
    data: Enumerable<LogCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Log update
   */
  export type LogUpdateArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * The data needed to update a Log.
     * 
    **/
    data: XOR<LogUpdateInput, LogUncheckedUpdateInput>
    /**
     * Choose, which Log to update.
     * 
    **/
    where: LogWhereUniqueInput
  }


  /**
   * Log updateMany
   */
  export type LogUpdateManyArgs = {
    /**
     * The data used to update Logs.
     * 
    **/
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyInput>
    /**
     * Filter which Logs to update
     * 
    **/
    where?: LogWhereInput
  }


  /**
   * Log upsert
   */
  export type LogUpsertArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * The filter to search for the Log to update in case it exists.
     * 
    **/
    where: LogWhereUniqueInput
    /**
     * In case the Log found by the `where` argument doesn't exist, create a new Log with this data.
     * 
    **/
    create: XOR<LogCreateInput, LogUncheckedCreateInput>
    /**
     * In case the Log was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LogUpdateInput, LogUncheckedUpdateInput>
  }


  /**
   * Log delete
   */
  export type LogDeleteArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
    /**
     * Filter which Log to delete.
     * 
    **/
    where: LogWhereUniqueInput
  }


  /**
   * Log deleteMany
   */
  export type LogDeleteManyArgs = {
    /**
     * Filter which Logs to delete
     * 
    **/
    where?: LogWhereInput
  }


  /**
   * Log: findUniqueOrThrow
   */
  export type LogFindUniqueOrThrowArgs = LogFindUniqueArgsBase
      

  /**
   * Log: findFirstOrThrow
   */
  export type LogFindFirstOrThrowArgs = LogFindFirstArgsBase
      

  /**
   * Log without action
   */
  export type LogArgs = {
    /**
     * Select specific fields to fetch from the Log
     * 
    **/
    select?: LogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LogInclude | null
  }



  /**
   * Model Puzzle
   */


  export type AggregatePuzzle = {
    _count: PuzzleCountAggregateOutputType | null
    _avg: PuzzleAvgAggregateOutputType | null
    _sum: PuzzleSumAggregateOutputType | null
    _min: PuzzleMinAggregateOutputType | null
    _max: PuzzleMaxAggregateOutputType | null
  }

  export type PuzzleAvgAggregateOutputType = {
    rating: number | null
  }

  export type PuzzleSumAggregateOutputType = {
    rating: number | null
  }

  export type PuzzleMinAggregateOutputType = {
    id: string | null
    fen: string | null
    originalId: string | null
    rating: number | null
    source: PuzzleSource | null
    processedAt: Date | null
  }

  export type PuzzleMaxAggregateOutputType = {
    id: string | null
    fen: string | null
    originalId: string | null
    rating: number | null
    source: PuzzleSource | null
    processedAt: Date | null
  }

  export type PuzzleCountAggregateOutputType = {
    id: number
    fen: number
    moves: number
    originalId: number
    rating: number
    source: number
    themes: number
    processedAt: number
    _all: number
  }


  export type PuzzleAvgAggregateInputType = {
    rating?: true
  }

  export type PuzzleSumAggregateInputType = {
    rating?: true
  }

  export type PuzzleMinAggregateInputType = {
    id?: true
    fen?: true
    originalId?: true
    rating?: true
    source?: true
    processedAt?: true
  }

  export type PuzzleMaxAggregateInputType = {
    id?: true
    fen?: true
    originalId?: true
    rating?: true
    source?: true
    processedAt?: true
  }

  export type PuzzleCountAggregateInputType = {
    id?: true
    fen?: true
    moves?: true
    originalId?: true
    rating?: true
    source?: true
    themes?: true
    processedAt?: true
    _all?: true
  }

  export type PuzzleAggregateArgs = {
    /**
     * Filter which Puzzle to aggregate.
     * 
    **/
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     * 
    **/
    orderBy?: Enumerable<PuzzleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Puzzles
    **/
    _count?: true | PuzzleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PuzzleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PuzzleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PuzzleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PuzzleMaxAggregateInputType
  }

  export type GetPuzzleAggregateType<T extends PuzzleAggregateArgs> = {
        [P in keyof T & keyof AggregatePuzzle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePuzzle[P]>
      : GetScalarType<T[P], AggregatePuzzle[P]>
  }




  export type PuzzleGroupByArgs = {
    where?: PuzzleWhereInput
    orderBy?: Enumerable<PuzzleOrderByWithAggregationInput>
    by: Array<PuzzleScalarFieldEnum>
    having?: PuzzleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PuzzleCountAggregateInputType | true
    _avg?: PuzzleAvgAggregateInputType
    _sum?: PuzzleSumAggregateInputType
    _min?: PuzzleMinAggregateInputType
    _max?: PuzzleMaxAggregateInputType
  }


  export type PuzzleGroupByOutputType = {
    id: string
    fen: string
    moves: string[]
    originalId: string
    rating: number
    source: PuzzleSource
    themes: string[]
    processedAt: Date
    _count: PuzzleCountAggregateOutputType | null
    _avg: PuzzleAvgAggregateOutputType | null
    _sum: PuzzleSumAggregateOutputType | null
    _min: PuzzleMinAggregateOutputType | null
    _max: PuzzleMaxAggregateOutputType | null
  }

  type GetPuzzleGroupByPayload<T extends PuzzleGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PuzzleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PuzzleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PuzzleGroupByOutputType[P]>
            : GetScalarType<T[P], PuzzleGroupByOutputType[P]>
        }
      >
    >


  export type PuzzleSelect = {
    id?: boolean
    fen?: boolean
    moves?: boolean
    originalId?: boolean
    rating?: boolean
    source?: boolean
    themes?: boolean
    processedAt?: boolean
    logs?: boolean | LogFindManyArgs
    _count?: boolean | PuzzleCountOutputTypeArgs
  }

  export type PuzzleInclude = {
    logs?: boolean | LogFindManyArgs
    _count?: boolean | PuzzleCountOutputTypeArgs
  }

  export type PuzzleGetPayload<
    S extends boolean | null | undefined | PuzzleArgs,
    U = keyof S
      > = S extends true
        ? Puzzle
    : S extends undefined
    ? never
    : S extends PuzzleArgs | PuzzleFindManyArgs
    ?'include' extends U
    ? Puzzle  & {
    [P in TrueKeys<S['include']>]:
        P extends 'logs' ? Array < LogGetPayload<S['include'][P]>>  :
        P extends '_count' ? PuzzleCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'logs' ? Array < LogGetPayload<S['select'][P]>>  :
        P extends '_count' ? PuzzleCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Puzzle ? Puzzle[P] : never
  } 
    : Puzzle
  : Puzzle


  type PuzzleCountArgs = Merge<
    Omit<PuzzleFindManyArgs, 'select' | 'include'> & {
      select?: PuzzleCountAggregateInputType | true
    }
  >

  export interface PuzzleDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Puzzle that matches the filter.
     * @param {PuzzleFindUniqueArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PuzzleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PuzzleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Puzzle'> extends True ? CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>> : CheckSelect<T, Prisma__PuzzleClient<Puzzle | null >, Prisma__PuzzleClient<PuzzleGetPayload<T> | null >>

    /**
     * Find the first Puzzle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleFindFirstArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PuzzleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PuzzleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Puzzle'> extends True ? CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>> : CheckSelect<T, Prisma__PuzzleClient<Puzzle | null >, Prisma__PuzzleClient<PuzzleGetPayload<T> | null >>

    /**
     * Find zero or more Puzzles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Puzzles
     * const puzzles = await prisma.puzzle.findMany()
     * 
     * // Get first 10 Puzzles
     * const puzzles = await prisma.puzzle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const puzzleWithIdOnly = await prisma.puzzle.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PuzzleFindManyArgs>(
      args?: SelectSubset<T, PuzzleFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Puzzle>>, PrismaPromise<Array<PuzzleGetPayload<T>>>>

    /**
     * Create a Puzzle.
     * @param {PuzzleCreateArgs} args - Arguments to create a Puzzle.
     * @example
     * // Create one Puzzle
     * const Puzzle = await prisma.puzzle.create({
     *   data: {
     *     // ... data to create a Puzzle
     *   }
     * })
     * 
    **/
    create<T extends PuzzleCreateArgs>(
      args: SelectSubset<T, PuzzleCreateArgs>
    ): CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>>

    /**
     * Create many Puzzles.
     *     @param {PuzzleCreateManyArgs} args - Arguments to create many Puzzles.
     *     @example
     *     // Create many Puzzles
     *     const puzzle = await prisma.puzzle.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PuzzleCreateManyArgs>(
      args?: SelectSubset<T, PuzzleCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Puzzle.
     * @param {PuzzleDeleteArgs} args - Arguments to delete one Puzzle.
     * @example
     * // Delete one Puzzle
     * const Puzzle = await prisma.puzzle.delete({
     *   where: {
     *     // ... filter to delete one Puzzle
     *   }
     * })
     * 
    **/
    delete<T extends PuzzleDeleteArgs>(
      args: SelectSubset<T, PuzzleDeleteArgs>
    ): CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>>

    /**
     * Update one Puzzle.
     * @param {PuzzleUpdateArgs} args - Arguments to update one Puzzle.
     * @example
     * // Update one Puzzle
     * const puzzle = await prisma.puzzle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PuzzleUpdateArgs>(
      args: SelectSubset<T, PuzzleUpdateArgs>
    ): CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>>

    /**
     * Delete zero or more Puzzles.
     * @param {PuzzleDeleteManyArgs} args - Arguments to filter Puzzles to delete.
     * @example
     * // Delete a few Puzzles
     * const { count } = await prisma.puzzle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PuzzleDeleteManyArgs>(
      args?: SelectSubset<T, PuzzleDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Puzzles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Puzzles
     * const puzzle = await prisma.puzzle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PuzzleUpdateManyArgs>(
      args: SelectSubset<T, PuzzleUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Puzzle.
     * @param {PuzzleUpsertArgs} args - Arguments to update or create a Puzzle.
     * @example
     * // Update or create a Puzzle
     * const puzzle = await prisma.puzzle.upsert({
     *   create: {
     *     // ... data to create a Puzzle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Puzzle we want to update
     *   }
     * })
    **/
    upsert<T extends PuzzleUpsertArgs>(
      args: SelectSubset<T, PuzzleUpsertArgs>
    ): CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>>

    /**
     * Find one Puzzle that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PuzzleFindUniqueOrThrowArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PuzzleFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PuzzleFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>>

    /**
     * Find the first Puzzle that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleFindFirstOrThrowArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PuzzleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PuzzleFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PuzzleClient<Puzzle>, Prisma__PuzzleClient<PuzzleGetPayload<T>>>

    /**
     * Count the number of Puzzles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleCountArgs} args - Arguments to filter Puzzles to count.
     * @example
     * // Count the number of Puzzles
     * const count = await prisma.puzzle.count({
     *   where: {
     *     // ... the filter for the Puzzles we want to count
     *   }
     * })
    **/
    count<T extends PuzzleCountArgs>(
      args?: Subset<T, PuzzleCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PuzzleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Puzzle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PuzzleAggregateArgs>(args: Subset<T, PuzzleAggregateArgs>): PrismaPromise<GetPuzzleAggregateType<T>>

    /**
     * Group by Puzzle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PuzzleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PuzzleGroupByArgs['orderBy'] }
        : { orderBy?: PuzzleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PuzzleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPuzzleGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Puzzle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PuzzleClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    logs<T extends LogFindManyArgs = {}>(args?: Subset<T, LogFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Log>>, PrismaPromise<Array<LogGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Puzzle base type for findUnique actions
   */
  export type PuzzleFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * Filter, which Puzzle to fetch.
     * 
    **/
    where: PuzzleWhereUniqueInput
  }

  /**
   * Puzzle: findUnique
   */
  export interface PuzzleFindUniqueArgs extends PuzzleFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Puzzle base type for findFirst actions
   */
  export type PuzzleFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * Filter, which Puzzle to fetch.
     * 
    **/
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     * 
    **/
    orderBy?: Enumerable<PuzzleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Puzzles.
     * 
    **/
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Puzzles.
     * 
    **/
    distinct?: Enumerable<PuzzleScalarFieldEnum>
  }

  /**
   * Puzzle: findFirst
   */
  export interface PuzzleFindFirstArgs extends PuzzleFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Puzzle findMany
   */
  export type PuzzleFindManyArgs = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * Filter, which Puzzles to fetch.
     * 
    **/
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     * 
    **/
    orderBy?: Enumerable<PuzzleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Puzzles.
     * 
    **/
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PuzzleScalarFieldEnum>
  }


  /**
   * Puzzle create
   */
  export type PuzzleCreateArgs = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * The data needed to create a Puzzle.
     * 
    **/
    data: XOR<PuzzleCreateInput, PuzzleUncheckedCreateInput>
  }


  /**
   * Puzzle createMany
   */
  export type PuzzleCreateManyArgs = {
    /**
     * The data used to create many Puzzles.
     * 
    **/
    data: Enumerable<PuzzleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Puzzle update
   */
  export type PuzzleUpdateArgs = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * The data needed to update a Puzzle.
     * 
    **/
    data: XOR<PuzzleUpdateInput, PuzzleUncheckedUpdateInput>
    /**
     * Choose, which Puzzle to update.
     * 
    **/
    where: PuzzleWhereUniqueInput
  }


  /**
   * Puzzle updateMany
   */
  export type PuzzleUpdateManyArgs = {
    /**
     * The data used to update Puzzles.
     * 
    **/
    data: XOR<PuzzleUpdateManyMutationInput, PuzzleUncheckedUpdateManyInput>
    /**
     * Filter which Puzzles to update
     * 
    **/
    where?: PuzzleWhereInput
  }


  /**
   * Puzzle upsert
   */
  export type PuzzleUpsertArgs = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * The filter to search for the Puzzle to update in case it exists.
     * 
    **/
    where: PuzzleWhereUniqueInput
    /**
     * In case the Puzzle found by the `where` argument doesn't exist, create a new Puzzle with this data.
     * 
    **/
    create: XOR<PuzzleCreateInput, PuzzleUncheckedCreateInput>
    /**
     * In case the Puzzle was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PuzzleUpdateInput, PuzzleUncheckedUpdateInput>
  }


  /**
   * Puzzle delete
   */
  export type PuzzleDeleteArgs = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
    /**
     * Filter which Puzzle to delete.
     * 
    **/
    where: PuzzleWhereUniqueInput
  }


  /**
   * Puzzle deleteMany
   */
  export type PuzzleDeleteManyArgs = {
    /**
     * Filter which Puzzles to delete
     * 
    **/
    where?: PuzzleWhereInput
  }


  /**
   * Puzzle: findUniqueOrThrow
   */
  export type PuzzleFindUniqueOrThrowArgs = PuzzleFindUniqueArgsBase
      

  /**
   * Puzzle: findFirstOrThrow
   */
  export type PuzzleFindFirstOrThrowArgs = PuzzleFindFirstArgsBase
      

  /**
   * Puzzle without action
   */
  export type PuzzleArgs = {
    /**
     * Select specific fields to fetch from the Puzzle
     * 
    **/
    select?: PuzzleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PuzzleInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const LogScalarFieldEnum: {
    id: 'id',
    wasSolved: 'wasSolved',
    createdAt: 'createdAt',
    puzzleId: 'puzzleId'
  };

  export type LogScalarFieldEnum = (typeof LogScalarFieldEnum)[keyof typeof LogScalarFieldEnum]


  export const PuzzleScalarFieldEnum: {
    id: 'id',
    fen: 'fen',
    moves: 'moves',
    originalId: 'originalId',
    rating: 'rating',
    source: 'source',
    themes: 'themes',
    processedAt: 'processedAt'
  };

  export type PuzzleScalarFieldEnum = (typeof PuzzleScalarFieldEnum)[keyof typeof PuzzleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type LogWhereInput = {
    AND?: Enumerable<LogWhereInput>
    OR?: Enumerable<LogWhereInput>
    NOT?: Enumerable<LogWhereInput>
    id?: StringFilter | string
    wasSolved?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    puzzle?: XOR<PuzzleRelationFilter, PuzzleWhereInput>
    puzzleId?: StringFilter | string
  }

  export type LogOrderByWithRelationInput = {
    id?: SortOrder
    wasSolved?: SortOrder
    createdAt?: SortOrder
    puzzle?: PuzzleOrderByWithRelationInput
    puzzleId?: SortOrder
  }

  export type LogWhereUniqueInput = {
    id?: string
  }

  export type LogOrderByWithAggregationInput = {
    id?: SortOrder
    wasSolved?: SortOrder
    createdAt?: SortOrder
    puzzleId?: SortOrder
    _count?: LogCountOrderByAggregateInput
    _max?: LogMaxOrderByAggregateInput
    _min?: LogMinOrderByAggregateInput
  }

  export type LogScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LogScalarWhereWithAggregatesInput>
    OR?: Enumerable<LogScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LogScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    wasSolved?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    puzzleId?: StringWithAggregatesFilter | string
  }

  export type PuzzleWhereInput = {
    AND?: Enumerable<PuzzleWhereInput>
    OR?: Enumerable<PuzzleWhereInput>
    NOT?: Enumerable<PuzzleWhereInput>
    id?: StringFilter | string
    fen?: StringFilter | string
    moves?: StringNullableListFilter
    originalId?: StringFilter | string
    rating?: IntFilter | number
    source?: EnumPuzzleSourceFilter | PuzzleSource
    themes?: StringNullableListFilter
    processedAt?: DateTimeFilter | Date | string
    logs?: LogListRelationFilter
  }

  export type PuzzleOrderByWithRelationInput = {
    id?: SortOrder
    fen?: SortOrder
    moves?: SortOrder
    originalId?: SortOrder
    rating?: SortOrder
    source?: SortOrder
    themes?: SortOrder
    processedAt?: SortOrder
    logs?: LogOrderByRelationAggregateInput
  }

  export type PuzzleWhereUniqueInput = {
    id?: string
    originalId?: string
  }

  export type PuzzleOrderByWithAggregationInput = {
    id?: SortOrder
    fen?: SortOrder
    moves?: SortOrder
    originalId?: SortOrder
    rating?: SortOrder
    source?: SortOrder
    themes?: SortOrder
    processedAt?: SortOrder
    _count?: PuzzleCountOrderByAggregateInput
    _avg?: PuzzleAvgOrderByAggregateInput
    _max?: PuzzleMaxOrderByAggregateInput
    _min?: PuzzleMinOrderByAggregateInput
    _sum?: PuzzleSumOrderByAggregateInput
  }

  export type PuzzleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PuzzleScalarWhereWithAggregatesInput>
    OR?: Enumerable<PuzzleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PuzzleScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    fen?: StringWithAggregatesFilter | string
    moves?: StringNullableListFilter
    originalId?: StringWithAggregatesFilter | string
    rating?: IntWithAggregatesFilter | number
    source?: EnumPuzzleSourceWithAggregatesFilter | PuzzleSource
    themes?: StringNullableListFilter
    processedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type LogCreateInput = {
    id?: string
    wasSolved: boolean
    createdAt?: Date | string
    puzzle: PuzzleCreateNestedOneWithoutLogsInput
  }

  export type LogUncheckedCreateInput = {
    id?: string
    wasSolved: boolean
    createdAt?: Date | string
    puzzleId: string
  }

  export type LogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    puzzle?: PuzzleUpdateOneRequiredWithoutLogsNestedInput
  }

  export type LogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    puzzleId?: StringFieldUpdateOperationsInput | string
  }

  export type LogCreateManyInput = {
    id?: string
    wasSolved: boolean
    createdAt?: Date | string
    puzzleId: string
  }

  export type LogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    puzzleId?: StringFieldUpdateOperationsInput | string
  }

  export type PuzzleCreateInput = {
    id?: string
    fen: string
    moves?: PuzzleCreatemovesInput | Enumerable<string>
    originalId: string
    rating: number
    source?: PuzzleSource
    themes?: PuzzleCreatethemesInput | Enumerable<string>
    processedAt?: Date | string
    logs?: LogCreateNestedManyWithoutPuzzleInput
  }

  export type PuzzleUncheckedCreateInput = {
    id?: string
    fen: string
    moves?: PuzzleCreatemovesInput | Enumerable<string>
    originalId: string
    rating: number
    source?: PuzzleSource
    themes?: PuzzleCreatethemesInput | Enumerable<string>
    processedAt?: Date | string
    logs?: LogUncheckedCreateNestedManyWithoutPuzzleInput
  }

  export type PuzzleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    moves?: PuzzleUpdatemovesInput | Enumerable<string>
    originalId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    source?: EnumPuzzleSourceFieldUpdateOperationsInput | PuzzleSource
    themes?: PuzzleUpdatethemesInput | Enumerable<string>
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: LogUpdateManyWithoutPuzzleNestedInput
  }

  export type PuzzleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    moves?: PuzzleUpdatemovesInput | Enumerable<string>
    originalId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    source?: EnumPuzzleSourceFieldUpdateOperationsInput | PuzzleSource
    themes?: PuzzleUpdatethemesInput | Enumerable<string>
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: LogUncheckedUpdateManyWithoutPuzzleNestedInput
  }

  export type PuzzleCreateManyInput = {
    id?: string
    fen: string
    moves?: PuzzleCreatemovesInput | Enumerable<string>
    originalId: string
    rating: number
    source?: PuzzleSource
    themes?: PuzzleCreatethemesInput | Enumerable<string>
    processedAt?: Date | string
  }

  export type PuzzleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    moves?: PuzzleUpdatemovesInput | Enumerable<string>
    originalId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    source?: EnumPuzzleSourceFieldUpdateOperationsInput | PuzzleSource
    themes?: PuzzleUpdatethemesInput | Enumerable<string>
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    moves?: PuzzleUpdatemovesInput | Enumerable<string>
    originalId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    source?: EnumPuzzleSourceFieldUpdateOperationsInput | PuzzleSource
    themes?: PuzzleUpdatethemesInput | Enumerable<string>
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type PuzzleRelationFilter = {
    is?: PuzzleWhereInput
    isNot?: PuzzleWhereInput
  }

  export type LogCountOrderByAggregateInput = {
    id?: SortOrder
    wasSolved?: SortOrder
    createdAt?: SortOrder
    puzzleId?: SortOrder
  }

  export type LogMaxOrderByAggregateInput = {
    id?: SortOrder
    wasSolved?: SortOrder
    createdAt?: SortOrder
    puzzleId?: SortOrder
  }

  export type LogMinOrderByAggregateInput = {
    id?: SortOrder
    wasSolved?: SortOrder
    createdAt?: SortOrder
    puzzleId?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type EnumPuzzleSourceFilter = {
    equals?: PuzzleSource
    in?: Enumerable<PuzzleSource>
    notIn?: Enumerable<PuzzleSource>
    not?: NestedEnumPuzzleSourceFilter | PuzzleSource
  }

  export type LogListRelationFilter = {
    every?: LogWhereInput
    some?: LogWhereInput
    none?: LogWhereInput
  }

  export type LogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PuzzleCountOrderByAggregateInput = {
    id?: SortOrder
    fen?: SortOrder
    moves?: SortOrder
    originalId?: SortOrder
    rating?: SortOrder
    source?: SortOrder
    themes?: SortOrder
    processedAt?: SortOrder
  }

  export type PuzzleAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type PuzzleMaxOrderByAggregateInput = {
    id?: SortOrder
    fen?: SortOrder
    originalId?: SortOrder
    rating?: SortOrder
    source?: SortOrder
    processedAt?: SortOrder
  }

  export type PuzzleMinOrderByAggregateInput = {
    id?: SortOrder
    fen?: SortOrder
    originalId?: SortOrder
    rating?: SortOrder
    source?: SortOrder
    processedAt?: SortOrder
  }

  export type PuzzleSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type EnumPuzzleSourceWithAggregatesFilter = {
    equals?: PuzzleSource
    in?: Enumerable<PuzzleSource>
    notIn?: Enumerable<PuzzleSource>
    not?: NestedEnumPuzzleSourceWithAggregatesFilter | PuzzleSource
    _count?: NestedIntFilter
    _min?: NestedEnumPuzzleSourceFilter
    _max?: NestedEnumPuzzleSourceFilter
  }

  export type PuzzleCreateNestedOneWithoutLogsInput = {
    create?: XOR<PuzzleCreateWithoutLogsInput, PuzzleUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PuzzleCreateOrConnectWithoutLogsInput
    connect?: PuzzleWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PuzzleUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<PuzzleCreateWithoutLogsInput, PuzzleUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PuzzleCreateOrConnectWithoutLogsInput
    upsert?: PuzzleUpsertWithoutLogsInput
    connect?: PuzzleWhereUniqueInput
    update?: XOR<PuzzleUpdateWithoutLogsInput, PuzzleUncheckedUpdateWithoutLogsInput>
  }

  export type PuzzleCreatemovesInput = {
    set: Enumerable<string>
  }

  export type PuzzleCreatethemesInput = {
    set: Enumerable<string>
  }

  export type LogCreateNestedManyWithoutPuzzleInput = {
    create?: XOR<Enumerable<LogCreateWithoutPuzzleInput>, Enumerable<LogUncheckedCreateWithoutPuzzleInput>>
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutPuzzleInput>
    createMany?: LogCreateManyPuzzleInputEnvelope
    connect?: Enumerable<LogWhereUniqueInput>
  }

  export type LogUncheckedCreateNestedManyWithoutPuzzleInput = {
    create?: XOR<Enumerable<LogCreateWithoutPuzzleInput>, Enumerable<LogUncheckedCreateWithoutPuzzleInput>>
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutPuzzleInput>
    createMany?: LogCreateManyPuzzleInputEnvelope
    connect?: Enumerable<LogWhereUniqueInput>
  }

  export type PuzzleUpdatemovesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPuzzleSourceFieldUpdateOperationsInput = {
    set?: PuzzleSource
  }

  export type PuzzleUpdatethemesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type LogUpdateManyWithoutPuzzleNestedInput = {
    create?: XOR<Enumerable<LogCreateWithoutPuzzleInput>, Enumerable<LogUncheckedCreateWithoutPuzzleInput>>
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutPuzzleInput>
    upsert?: Enumerable<LogUpsertWithWhereUniqueWithoutPuzzleInput>
    createMany?: LogCreateManyPuzzleInputEnvelope
    set?: Enumerable<LogWhereUniqueInput>
    disconnect?: Enumerable<LogWhereUniqueInput>
    delete?: Enumerable<LogWhereUniqueInput>
    connect?: Enumerable<LogWhereUniqueInput>
    update?: Enumerable<LogUpdateWithWhereUniqueWithoutPuzzleInput>
    updateMany?: Enumerable<LogUpdateManyWithWhereWithoutPuzzleInput>
    deleteMany?: Enumerable<LogScalarWhereInput>
  }

  export type LogUncheckedUpdateManyWithoutPuzzleNestedInput = {
    create?: XOR<Enumerable<LogCreateWithoutPuzzleInput>, Enumerable<LogUncheckedCreateWithoutPuzzleInput>>
    connectOrCreate?: Enumerable<LogCreateOrConnectWithoutPuzzleInput>
    upsert?: Enumerable<LogUpsertWithWhereUniqueWithoutPuzzleInput>
    createMany?: LogCreateManyPuzzleInputEnvelope
    set?: Enumerable<LogWhereUniqueInput>
    disconnect?: Enumerable<LogWhereUniqueInput>
    delete?: Enumerable<LogWhereUniqueInput>
    connect?: Enumerable<LogWhereUniqueInput>
    update?: Enumerable<LogUpdateWithWhereUniqueWithoutPuzzleInput>
    updateMany?: Enumerable<LogUpdateManyWithWhereWithoutPuzzleInput>
    deleteMany?: Enumerable<LogScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumPuzzleSourceFilter = {
    equals?: PuzzleSource
    in?: Enumerable<PuzzleSource>
    notIn?: Enumerable<PuzzleSource>
    not?: NestedEnumPuzzleSourceFilter | PuzzleSource
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedEnumPuzzleSourceWithAggregatesFilter = {
    equals?: PuzzleSource
    in?: Enumerable<PuzzleSource>
    notIn?: Enumerable<PuzzleSource>
    not?: NestedEnumPuzzleSourceWithAggregatesFilter | PuzzleSource
    _count?: NestedIntFilter
    _min?: NestedEnumPuzzleSourceFilter
    _max?: NestedEnumPuzzleSourceFilter
  }

  export type PuzzleCreateWithoutLogsInput = {
    id?: string
    fen: string
    moves?: PuzzleCreatemovesInput | Enumerable<string>
    originalId: string
    rating: number
    source?: PuzzleSource
    themes?: PuzzleCreatethemesInput | Enumerable<string>
    processedAt?: Date | string
  }

  export type PuzzleUncheckedCreateWithoutLogsInput = {
    id?: string
    fen: string
    moves?: PuzzleCreatemovesInput | Enumerable<string>
    originalId: string
    rating: number
    source?: PuzzleSource
    themes?: PuzzleCreatethemesInput | Enumerable<string>
    processedAt?: Date | string
  }

  export type PuzzleCreateOrConnectWithoutLogsInput = {
    where: PuzzleWhereUniqueInput
    create: XOR<PuzzleCreateWithoutLogsInput, PuzzleUncheckedCreateWithoutLogsInput>
  }

  export type PuzzleUpsertWithoutLogsInput = {
    update: XOR<PuzzleUpdateWithoutLogsInput, PuzzleUncheckedUpdateWithoutLogsInput>
    create: XOR<PuzzleCreateWithoutLogsInput, PuzzleUncheckedCreateWithoutLogsInput>
  }

  export type PuzzleUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    moves?: PuzzleUpdatemovesInput | Enumerable<string>
    originalId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    source?: EnumPuzzleSourceFieldUpdateOperationsInput | PuzzleSource
    themes?: PuzzleUpdatethemesInput | Enumerable<string>
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    moves?: PuzzleUpdatemovesInput | Enumerable<string>
    originalId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    source?: EnumPuzzleSourceFieldUpdateOperationsInput | PuzzleSource
    themes?: PuzzleUpdatethemesInput | Enumerable<string>
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogCreateWithoutPuzzleInput = {
    id?: string
    wasSolved: boolean
    createdAt?: Date | string
  }

  export type LogUncheckedCreateWithoutPuzzleInput = {
    id?: string
    wasSolved: boolean
    createdAt?: Date | string
  }

  export type LogCreateOrConnectWithoutPuzzleInput = {
    where: LogWhereUniqueInput
    create: XOR<LogCreateWithoutPuzzleInput, LogUncheckedCreateWithoutPuzzleInput>
  }

  export type LogCreateManyPuzzleInputEnvelope = {
    data: Enumerable<LogCreateManyPuzzleInput>
    skipDuplicates?: boolean
  }

  export type LogUpsertWithWhereUniqueWithoutPuzzleInput = {
    where: LogWhereUniqueInput
    update: XOR<LogUpdateWithoutPuzzleInput, LogUncheckedUpdateWithoutPuzzleInput>
    create: XOR<LogCreateWithoutPuzzleInput, LogUncheckedCreateWithoutPuzzleInput>
  }

  export type LogUpdateWithWhereUniqueWithoutPuzzleInput = {
    where: LogWhereUniqueInput
    data: XOR<LogUpdateWithoutPuzzleInput, LogUncheckedUpdateWithoutPuzzleInput>
  }

  export type LogUpdateManyWithWhereWithoutPuzzleInput = {
    where: LogScalarWhereInput
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyWithoutLogsInput>
  }

  export type LogScalarWhereInput = {
    AND?: Enumerable<LogScalarWhereInput>
    OR?: Enumerable<LogScalarWhereInput>
    NOT?: Enumerable<LogScalarWhereInput>
    id?: StringFilter | string
    wasSolved?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    puzzleId?: StringFilter | string
  }

  export type LogCreateManyPuzzleInput = {
    id?: string
    wasSolved: boolean
    createdAt?: Date | string
  }

  export type LogUpdateWithoutPuzzleInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogUncheckedUpdateWithoutPuzzleInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogUncheckedUpdateManyWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    wasSolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}