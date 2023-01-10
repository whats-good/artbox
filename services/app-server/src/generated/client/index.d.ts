
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
 * Model User
 * 
 */
export type User = {
  id: number
  createdAt: Date
  updatedAt: Date
  address: string
  username: string
  description: string | null
}

/**
 * Model UserOnContract
 * 
 */
export type UserOnContract = {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  smartContractId: number
}

/**
 * Model SmartContract
 * 
 */
export type SmartContract = {
  id: number
  createdAt: Date
  updatedAt: Date
  contractAddress: string
  networkId: number
}

/**
 * Model Network
 * 
 */
export type Network = {
  id: number
  name: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.userOnContract`: Exposes CRUD operations for the **UserOnContract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOnContracts
    * const userOnContracts = await prisma.userOnContract.findMany()
    * ```
    */
  get userOnContract(): Prisma.UserOnContractDelegate<GlobalReject>;

  /**
   * `prisma.smartContract`: Exposes CRUD operations for the **SmartContract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SmartContracts
    * const smartContracts = await prisma.smartContract.findMany()
    * ```
    */
  get smartContract(): Prisma.SmartContractDelegate<GlobalReject>;

  /**
   * `prisma.network`: Exposes CRUD operations for the **Network** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Networks
    * const networks = await prisma.network.findMany()
    * ```
    */
  get network(): Prisma.NetworkDelegate<GlobalReject>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Extensions
   */
  export type Extension = runtime.Extension 

  /**
   * Prisma Client JS version: 4.5.0
   * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
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
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

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


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

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
    User: 'User',
    UserOnContract: 'UserOnContract',
    SmartContract: 'SmartContract',
    Network: 'Network'
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
     * Overwrites the datasource url from your schema.prisma file
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
   * These options are being passed into the middleware as "params"
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
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    contracts: number
  }

  export type UserCountOutputTypeSelect = {
    contracts?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type SmartContractCountOutputType
   */


  export type SmartContractCountOutputType = {
    users: number
  }

  export type SmartContractCountOutputTypeSelect = {
    users?: boolean
  }

  export type SmartContractCountOutputTypeGetPayload<
    S extends boolean | null | undefined | SmartContractCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? SmartContractCountOutputType
    : S extends undefined
    ? never
    : S extends SmartContractCountOutputTypeArgs
    ?'include' extends U
    ? SmartContractCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof SmartContractCountOutputType ? SmartContractCountOutputType[P] : never
  } 
    : SmartContractCountOutputType
  : SmartContractCountOutputType




  // Custom InputTypes

  /**
   * SmartContractCountOutputType without action
   */
  export type SmartContractCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the SmartContractCountOutputType
     * 
    **/
    select?: SmartContractCountOutputTypeSelect | null
  }



  /**
   * Count Type NetworkCountOutputType
   */


  export type NetworkCountOutputType = {
    smartContract: number
  }

  export type NetworkCountOutputTypeSelect = {
    smartContract?: boolean
  }

  export type NetworkCountOutputTypeGetPayload<
    S extends boolean | null | undefined | NetworkCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? NetworkCountOutputType
    : S extends undefined
    ? never
    : S extends NetworkCountOutputTypeArgs
    ?'include' extends U
    ? NetworkCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof NetworkCountOutputType ? NetworkCountOutputType[P] : never
  } 
    : NetworkCountOutputType
  : NetworkCountOutputType




  // Custom InputTypes

  /**
   * NetworkCountOutputType without action
   */
  export type NetworkCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the NetworkCountOutputType
     * 
    **/
    select?: NetworkCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    address: string | null
    username: string | null
    description: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    address: string | null
    username: string | null
    description: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    address: number
    username: number
    description: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    username?: true
    description?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    username?: true
    description?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    username?: true
    description?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    address: string
    username: string
    description: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    address?: boolean
    username?: boolean
    description?: boolean
    contracts?: boolean | UserOnContractFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    contracts?: boolean | UserOnContractFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'contracts' ? Array < UserOnContractGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'contracts' ? Array < UserOnContractGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
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

    contracts<T extends UserOnContractFindManyArgs = {}>(args?: Subset<T, UserOnContractFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserOnContract>| Null>, PrismaPromise<Array<UserOnContractGetPayload<T>>| Null>>;

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
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model UserOnContract
   */


  export type AggregateUserOnContract = {
    _count: UserOnContractCountAggregateOutputType | null
    _avg: UserOnContractAvgAggregateOutputType | null
    _sum: UserOnContractSumAggregateOutputType | null
    _min: UserOnContractMinAggregateOutputType | null
    _max: UserOnContractMaxAggregateOutputType | null
  }

  export type UserOnContractAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    smartContractId: number | null
  }

  export type UserOnContractSumAggregateOutputType = {
    id: number | null
    userId: number | null
    smartContractId: number | null
  }

  export type UserOnContractMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    smartContractId: number | null
  }

  export type UserOnContractMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    smartContractId: number | null
  }

  export type UserOnContractCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    smartContractId: number
    _all: number
  }


  export type UserOnContractAvgAggregateInputType = {
    id?: true
    userId?: true
    smartContractId?: true
  }

  export type UserOnContractSumAggregateInputType = {
    id?: true
    userId?: true
    smartContractId?: true
  }

  export type UserOnContractMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    smartContractId?: true
  }

  export type UserOnContractMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    smartContractId?: true
  }

  export type UserOnContractCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    smartContractId?: true
    _all?: true
  }

  export type UserOnContractAggregateArgs = {
    /**
     * Filter which UserOnContract to aggregate.
     * 
    **/
    where?: UserOnContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnContracts to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOnContractOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserOnContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnContracts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnContracts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOnContracts
    **/
    _count?: true | UserOnContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserOnContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserOnContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOnContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOnContractMaxAggregateInputType
  }

  export type GetUserOnContractAggregateType<T extends UserOnContractAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOnContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOnContract[P]>
      : GetScalarType<T[P], AggregateUserOnContract[P]>
  }




  export type UserOnContractGroupByArgs = {
    where?: UserOnContractWhereInput
    orderBy?: Enumerable<UserOnContractOrderByWithAggregationInput>
    by: Array<UserOnContractScalarFieldEnum>
    having?: UserOnContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOnContractCountAggregateInputType | true
    _avg?: UserOnContractAvgAggregateInputType
    _sum?: UserOnContractSumAggregateInputType
    _min?: UserOnContractMinAggregateInputType
    _max?: UserOnContractMaxAggregateInputType
  }


  export type UserOnContractGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    smartContractId: number
    _count: UserOnContractCountAggregateOutputType | null
    _avg: UserOnContractAvgAggregateOutputType | null
    _sum: UserOnContractSumAggregateOutputType | null
    _min: UserOnContractMinAggregateOutputType | null
    _max: UserOnContractMaxAggregateOutputType | null
  }

  type GetUserOnContractGroupByPayload<T extends UserOnContractGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserOnContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOnContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOnContractGroupByOutputType[P]>
            : GetScalarType<T[P], UserOnContractGroupByOutputType[P]>
        }
      >
    >


  export type UserOnContractSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    smartContract?: boolean | SmartContractArgs
    smartContractId?: boolean
  }

  export type UserOnContractInclude = {
    user?: boolean | UserArgs
    smartContract?: boolean | SmartContractArgs
  }

  export type UserOnContractGetPayload<
    S extends boolean | null | undefined | UserOnContractArgs,
    U = keyof S
      > = S extends true
        ? UserOnContract
    : S extends undefined
    ? never
    : S extends UserOnContractArgs | UserOnContractFindManyArgs
    ?'include' extends U
    ? UserOnContract  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'smartContract' ? SmartContractGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'smartContract' ? SmartContractGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof UserOnContract ? UserOnContract[P] : never
  } 
    : UserOnContract
  : UserOnContract


  type UserOnContractCountArgs = Merge<
    Omit<UserOnContractFindManyArgs, 'select' | 'include'> & {
      select?: UserOnContractCountAggregateInputType | true
    }
  >

  export interface UserOnContractDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one UserOnContract that matches the filter.
     * @param {UserOnContractFindUniqueArgs} args - Arguments to find a UserOnContract
     * @example
     * // Get one UserOnContract
     * const userOnContract = await prisma.userOnContract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserOnContractFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserOnContractFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserOnContract'> extends True ? CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>> : CheckSelect<T, Prisma__UserOnContractClient<UserOnContract | null, null>, Prisma__UserOnContractClient<UserOnContractGetPayload<T> | null, null>>

    /**
     * Find the first UserOnContract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractFindFirstArgs} args - Arguments to find a UserOnContract
     * @example
     * // Get one UserOnContract
     * const userOnContract = await prisma.userOnContract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserOnContractFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserOnContractFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserOnContract'> extends True ? CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>> : CheckSelect<T, Prisma__UserOnContractClient<UserOnContract | null, null>, Prisma__UserOnContractClient<UserOnContractGetPayload<T> | null, null>>

    /**
     * Find zero or more UserOnContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOnContracts
     * const userOnContracts = await prisma.userOnContract.findMany()
     * 
     * // Get first 10 UserOnContracts
     * const userOnContracts = await prisma.userOnContract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOnContractWithIdOnly = await prisma.userOnContract.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserOnContractFindManyArgs>(
      args?: SelectSubset<T, UserOnContractFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserOnContract>>, PrismaPromise<Array<UserOnContractGetPayload<T>>>>

    /**
     * Create a UserOnContract.
     * @param {UserOnContractCreateArgs} args - Arguments to create a UserOnContract.
     * @example
     * // Create one UserOnContract
     * const UserOnContract = await prisma.userOnContract.create({
     *   data: {
     *     // ... data to create a UserOnContract
     *   }
     * })
     * 
    **/
    create<T extends UserOnContractCreateArgs>(
      args: SelectSubset<T, UserOnContractCreateArgs>
    ): CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>>

    /**
     * Create many UserOnContracts.
     *     @param {UserOnContractCreateManyArgs} args - Arguments to create many UserOnContracts.
     *     @example
     *     // Create many UserOnContracts
     *     const userOnContract = await prisma.userOnContract.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserOnContractCreateManyArgs>(
      args?: SelectSubset<T, UserOnContractCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserOnContract.
     * @param {UserOnContractDeleteArgs} args - Arguments to delete one UserOnContract.
     * @example
     * // Delete one UserOnContract
     * const UserOnContract = await prisma.userOnContract.delete({
     *   where: {
     *     // ... filter to delete one UserOnContract
     *   }
     * })
     * 
    **/
    delete<T extends UserOnContractDeleteArgs>(
      args: SelectSubset<T, UserOnContractDeleteArgs>
    ): CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>>

    /**
     * Update one UserOnContract.
     * @param {UserOnContractUpdateArgs} args - Arguments to update one UserOnContract.
     * @example
     * // Update one UserOnContract
     * const userOnContract = await prisma.userOnContract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserOnContractUpdateArgs>(
      args: SelectSubset<T, UserOnContractUpdateArgs>
    ): CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>>

    /**
     * Delete zero or more UserOnContracts.
     * @param {UserOnContractDeleteManyArgs} args - Arguments to filter UserOnContracts to delete.
     * @example
     * // Delete a few UserOnContracts
     * const { count } = await prisma.userOnContract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserOnContractDeleteManyArgs>(
      args?: SelectSubset<T, UserOnContractDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOnContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOnContracts
     * const userOnContract = await prisma.userOnContract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserOnContractUpdateManyArgs>(
      args: SelectSubset<T, UserOnContractUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserOnContract.
     * @param {UserOnContractUpsertArgs} args - Arguments to update or create a UserOnContract.
     * @example
     * // Update or create a UserOnContract
     * const userOnContract = await prisma.userOnContract.upsert({
     *   create: {
     *     // ... data to create a UserOnContract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOnContract we want to update
     *   }
     * })
    **/
    upsert<T extends UserOnContractUpsertArgs>(
      args: SelectSubset<T, UserOnContractUpsertArgs>
    ): CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>>

    /**
     * Find one UserOnContract that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserOnContractFindUniqueOrThrowArgs} args - Arguments to find a UserOnContract
     * @example
     * // Get one UserOnContract
     * const userOnContract = await prisma.userOnContract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserOnContractFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserOnContractFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>>

    /**
     * Find the first UserOnContract that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractFindFirstOrThrowArgs} args - Arguments to find a UserOnContract
     * @example
     * // Get one UserOnContract
     * const userOnContract = await prisma.userOnContract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserOnContractFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserOnContractFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserOnContractClient<UserOnContract>, Prisma__UserOnContractClient<UserOnContractGetPayload<T>>>

    /**
     * Count the number of UserOnContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractCountArgs} args - Arguments to filter UserOnContracts to count.
     * @example
     * // Count the number of UserOnContracts
     * const count = await prisma.userOnContract.count({
     *   where: {
     *     // ... the filter for the UserOnContracts we want to count
     *   }
     * })
    **/
    count<T extends UserOnContractCountArgs>(
      args?: Subset<T, UserOnContractCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOnContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOnContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserOnContractAggregateArgs>(args: Subset<T, UserOnContractAggregateArgs>): PrismaPromise<GetUserOnContractAggregateType<T>>

    /**
     * Group by UserOnContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnContractGroupByArgs} args - Group by arguments.
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
      T extends UserOnContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOnContractGroupByArgs['orderBy'] }
        : { orderBy?: UserOnContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserOnContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOnContractGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOnContract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserOnContractClient<T, Null = never> implements PrismaPromise<T> {
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

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    smartContract<T extends SmartContractArgs = {}>(args?: Subset<T, SmartContractArgs>): CheckSelect<T, Prisma__SmartContractClient<SmartContract | Null>, Prisma__SmartContractClient<SmartContractGetPayload<T> | Null>>;

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
   * UserOnContract base type for findUnique actions
   */
  export type UserOnContractFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * Filter, which UserOnContract to fetch.
     * 
    **/
    where: UserOnContractWhereUniqueInput
  }

  /**
   * UserOnContract: findUnique
   */
  export interface UserOnContractFindUniqueArgs extends UserOnContractFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserOnContract base type for findFirst actions
   */
  export type UserOnContractFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * Filter, which UserOnContract to fetch.
     * 
    **/
    where?: UserOnContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnContracts to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOnContractOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnContracts.
     * 
    **/
    cursor?: UserOnContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnContracts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnContracts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnContracts.
     * 
    **/
    distinct?: Enumerable<UserOnContractScalarFieldEnum>
  }

  /**
   * UserOnContract: findFirst
   */
  export interface UserOnContractFindFirstArgs extends UserOnContractFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserOnContract findMany
   */
  export type UserOnContractFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * Filter, which UserOnContracts to fetch.
     * 
    **/
    where?: UserOnContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnContracts to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOnContractOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOnContracts.
     * 
    **/
    cursor?: UserOnContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnContracts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnContracts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserOnContractScalarFieldEnum>
  }


  /**
   * UserOnContract create
   */
  export type UserOnContractCreateArgs = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * The data needed to create a UserOnContract.
     * 
    **/
    data: XOR<UserOnContractCreateInput, UserOnContractUncheckedCreateInput>
  }


  /**
   * UserOnContract createMany
   */
  export type UserOnContractCreateManyArgs = {
    /**
     * The data used to create many UserOnContracts.
     * 
    **/
    data: Enumerable<UserOnContractCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserOnContract update
   */
  export type UserOnContractUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * The data needed to update a UserOnContract.
     * 
    **/
    data: XOR<UserOnContractUpdateInput, UserOnContractUncheckedUpdateInput>
    /**
     * Choose, which UserOnContract to update.
     * 
    **/
    where: UserOnContractWhereUniqueInput
  }


  /**
   * UserOnContract updateMany
   */
  export type UserOnContractUpdateManyArgs = {
    /**
     * The data used to update UserOnContracts.
     * 
    **/
    data: XOR<UserOnContractUpdateManyMutationInput, UserOnContractUncheckedUpdateManyInput>
    /**
     * Filter which UserOnContracts to update
     * 
    **/
    where?: UserOnContractWhereInput
  }


  /**
   * UserOnContract upsert
   */
  export type UserOnContractUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * The filter to search for the UserOnContract to update in case it exists.
     * 
    **/
    where: UserOnContractWhereUniqueInput
    /**
     * In case the UserOnContract found by the `where` argument doesn't exist, create a new UserOnContract with this data.
     * 
    **/
    create: XOR<UserOnContractCreateInput, UserOnContractUncheckedCreateInput>
    /**
     * In case the UserOnContract was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserOnContractUpdateInput, UserOnContractUncheckedUpdateInput>
  }


  /**
   * UserOnContract delete
   */
  export type UserOnContractDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
    /**
     * Filter which UserOnContract to delete.
     * 
    **/
    where: UserOnContractWhereUniqueInput
  }


  /**
   * UserOnContract deleteMany
   */
  export type UserOnContractDeleteManyArgs = {
    /**
     * Filter which UserOnContracts to delete
     * 
    **/
    where?: UserOnContractWhereInput
  }


  /**
   * UserOnContract: findUniqueOrThrow
   */
  export type UserOnContractFindUniqueOrThrowArgs = UserOnContractFindUniqueArgsBase
      

  /**
   * UserOnContract: findFirstOrThrow
   */
  export type UserOnContractFindFirstOrThrowArgs = UserOnContractFindFirstArgsBase
      

  /**
   * UserOnContract without action
   */
  export type UserOnContractArgs = {
    /**
     * Select specific fields to fetch from the UserOnContract
     * 
    **/
    select?: UserOnContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserOnContractInclude | null
  }



  /**
   * Model SmartContract
   */


  export type AggregateSmartContract = {
    _count: SmartContractCountAggregateOutputType | null
    _avg: SmartContractAvgAggregateOutputType | null
    _sum: SmartContractSumAggregateOutputType | null
    _min: SmartContractMinAggregateOutputType | null
    _max: SmartContractMaxAggregateOutputType | null
  }

  export type SmartContractAvgAggregateOutputType = {
    id: number | null
    networkId: number | null
  }

  export type SmartContractSumAggregateOutputType = {
    id: number | null
    networkId: number | null
  }

  export type SmartContractMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    contractAddress: string | null
    networkId: number | null
  }

  export type SmartContractMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    contractAddress: string | null
    networkId: number | null
  }

  export type SmartContractCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    contractAddress: number
    networkId: number
    _all: number
  }


  export type SmartContractAvgAggregateInputType = {
    id?: true
    networkId?: true
  }

  export type SmartContractSumAggregateInputType = {
    id?: true
    networkId?: true
  }

  export type SmartContractMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    contractAddress?: true
    networkId?: true
  }

  export type SmartContractMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    contractAddress?: true
    networkId?: true
  }

  export type SmartContractCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    contractAddress?: true
    networkId?: true
    _all?: true
  }

  export type SmartContractAggregateArgs = {
    /**
     * Filter which SmartContract to aggregate.
     * 
    **/
    where?: SmartContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmartContracts to fetch.
     * 
    **/
    orderBy?: Enumerable<SmartContractOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SmartContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmartContracts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmartContracts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SmartContracts
    **/
    _count?: true | SmartContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SmartContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SmartContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SmartContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SmartContractMaxAggregateInputType
  }

  export type GetSmartContractAggregateType<T extends SmartContractAggregateArgs> = {
        [P in keyof T & keyof AggregateSmartContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSmartContract[P]>
      : GetScalarType<T[P], AggregateSmartContract[P]>
  }




  export type SmartContractGroupByArgs = {
    where?: SmartContractWhereInput
    orderBy?: Enumerable<SmartContractOrderByWithAggregationInput>
    by: Array<SmartContractScalarFieldEnum>
    having?: SmartContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SmartContractCountAggregateInputType | true
    _avg?: SmartContractAvgAggregateInputType
    _sum?: SmartContractSumAggregateInputType
    _min?: SmartContractMinAggregateInputType
    _max?: SmartContractMaxAggregateInputType
  }


  export type SmartContractGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    contractAddress: string
    networkId: number
    _count: SmartContractCountAggregateOutputType | null
    _avg: SmartContractAvgAggregateOutputType | null
    _sum: SmartContractSumAggregateOutputType | null
    _min: SmartContractMinAggregateOutputType | null
    _max: SmartContractMaxAggregateOutputType | null
  }

  type GetSmartContractGroupByPayload<T extends SmartContractGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SmartContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SmartContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SmartContractGroupByOutputType[P]>
            : GetScalarType<T[P], SmartContractGroupByOutputType[P]>
        }
      >
    >


  export type SmartContractSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractAddress?: boolean
    network?: boolean | NetworkArgs
    networkId?: boolean
    users?: boolean | UserOnContractFindManyArgs
    _count?: boolean | SmartContractCountOutputTypeArgs
  }

  export type SmartContractInclude = {
    network?: boolean | NetworkArgs
    users?: boolean | UserOnContractFindManyArgs
    _count?: boolean | SmartContractCountOutputTypeArgs
  }

  export type SmartContractGetPayload<
    S extends boolean | null | undefined | SmartContractArgs,
    U = keyof S
      > = S extends true
        ? SmartContract
    : S extends undefined
    ? never
    : S extends SmartContractArgs | SmartContractFindManyArgs
    ?'include' extends U
    ? SmartContract  & {
    [P in TrueKeys<S['include']>]:
        P extends 'network' ? NetworkGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'users' ? Array < UserOnContractGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? SmartContractCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'network' ? NetworkGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'users' ? Array < UserOnContractGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? SmartContractCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof SmartContract ? SmartContract[P] : never
  } 
    : SmartContract
  : SmartContract


  type SmartContractCountArgs = Merge<
    Omit<SmartContractFindManyArgs, 'select' | 'include'> & {
      select?: SmartContractCountAggregateInputType | true
    }
  >

  export interface SmartContractDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one SmartContract that matches the filter.
     * @param {SmartContractFindUniqueArgs} args - Arguments to find a SmartContract
     * @example
     * // Get one SmartContract
     * const smartContract = await prisma.smartContract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SmartContractFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SmartContractFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'SmartContract'> extends True ? CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>> : CheckSelect<T, Prisma__SmartContractClient<SmartContract | null, null>, Prisma__SmartContractClient<SmartContractGetPayload<T> | null, null>>

    /**
     * Find the first SmartContract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractFindFirstArgs} args - Arguments to find a SmartContract
     * @example
     * // Get one SmartContract
     * const smartContract = await prisma.smartContract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SmartContractFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SmartContractFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'SmartContract'> extends True ? CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>> : CheckSelect<T, Prisma__SmartContractClient<SmartContract | null, null>, Prisma__SmartContractClient<SmartContractGetPayload<T> | null, null>>

    /**
     * Find zero or more SmartContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SmartContracts
     * const smartContracts = await prisma.smartContract.findMany()
     * 
     * // Get first 10 SmartContracts
     * const smartContracts = await prisma.smartContract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const smartContractWithIdOnly = await prisma.smartContract.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SmartContractFindManyArgs>(
      args?: SelectSubset<T, SmartContractFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<SmartContract>>, PrismaPromise<Array<SmartContractGetPayload<T>>>>

    /**
     * Create a SmartContract.
     * @param {SmartContractCreateArgs} args - Arguments to create a SmartContract.
     * @example
     * // Create one SmartContract
     * const SmartContract = await prisma.smartContract.create({
     *   data: {
     *     // ... data to create a SmartContract
     *   }
     * })
     * 
    **/
    create<T extends SmartContractCreateArgs>(
      args: SelectSubset<T, SmartContractCreateArgs>
    ): CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>>

    /**
     * Create many SmartContracts.
     *     @param {SmartContractCreateManyArgs} args - Arguments to create many SmartContracts.
     *     @example
     *     // Create many SmartContracts
     *     const smartContract = await prisma.smartContract.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SmartContractCreateManyArgs>(
      args?: SelectSubset<T, SmartContractCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a SmartContract.
     * @param {SmartContractDeleteArgs} args - Arguments to delete one SmartContract.
     * @example
     * // Delete one SmartContract
     * const SmartContract = await prisma.smartContract.delete({
     *   where: {
     *     // ... filter to delete one SmartContract
     *   }
     * })
     * 
    **/
    delete<T extends SmartContractDeleteArgs>(
      args: SelectSubset<T, SmartContractDeleteArgs>
    ): CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>>

    /**
     * Update one SmartContract.
     * @param {SmartContractUpdateArgs} args - Arguments to update one SmartContract.
     * @example
     * // Update one SmartContract
     * const smartContract = await prisma.smartContract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SmartContractUpdateArgs>(
      args: SelectSubset<T, SmartContractUpdateArgs>
    ): CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>>

    /**
     * Delete zero or more SmartContracts.
     * @param {SmartContractDeleteManyArgs} args - Arguments to filter SmartContracts to delete.
     * @example
     * // Delete a few SmartContracts
     * const { count } = await prisma.smartContract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SmartContractDeleteManyArgs>(
      args?: SelectSubset<T, SmartContractDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more SmartContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SmartContracts
     * const smartContract = await prisma.smartContract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SmartContractUpdateManyArgs>(
      args: SelectSubset<T, SmartContractUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one SmartContract.
     * @param {SmartContractUpsertArgs} args - Arguments to update or create a SmartContract.
     * @example
     * // Update or create a SmartContract
     * const smartContract = await prisma.smartContract.upsert({
     *   create: {
     *     // ... data to create a SmartContract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SmartContract we want to update
     *   }
     * })
    **/
    upsert<T extends SmartContractUpsertArgs>(
      args: SelectSubset<T, SmartContractUpsertArgs>
    ): CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>>

    /**
     * Find one SmartContract that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {SmartContractFindUniqueOrThrowArgs} args - Arguments to find a SmartContract
     * @example
     * // Get one SmartContract
     * const smartContract = await prisma.smartContract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SmartContractFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SmartContractFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>>

    /**
     * Find the first SmartContract that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractFindFirstOrThrowArgs} args - Arguments to find a SmartContract
     * @example
     * // Get one SmartContract
     * const smartContract = await prisma.smartContract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SmartContractFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SmartContractFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__SmartContractClient<SmartContract>, Prisma__SmartContractClient<SmartContractGetPayload<T>>>

    /**
     * Count the number of SmartContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractCountArgs} args - Arguments to filter SmartContracts to count.
     * @example
     * // Count the number of SmartContracts
     * const count = await prisma.smartContract.count({
     *   where: {
     *     // ... the filter for the SmartContracts we want to count
     *   }
     * })
    **/
    count<T extends SmartContractCountArgs>(
      args?: Subset<T, SmartContractCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SmartContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SmartContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SmartContractAggregateArgs>(args: Subset<T, SmartContractAggregateArgs>): PrismaPromise<GetSmartContractAggregateType<T>>

    /**
     * Group by SmartContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmartContractGroupByArgs} args - Group by arguments.
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
      T extends SmartContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SmartContractGroupByArgs['orderBy'] }
        : { orderBy?: SmartContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SmartContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSmartContractGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for SmartContract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SmartContractClient<T, Null = never> implements PrismaPromise<T> {
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

    network<T extends NetworkArgs = {}>(args?: Subset<T, NetworkArgs>): CheckSelect<T, Prisma__NetworkClient<Network | Null>, Prisma__NetworkClient<NetworkGetPayload<T> | Null>>;

    users<T extends UserOnContractFindManyArgs = {}>(args?: Subset<T, UserOnContractFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserOnContract>| Null>, PrismaPromise<Array<UserOnContractGetPayload<T>>| Null>>;

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
   * SmartContract base type for findUnique actions
   */
  export type SmartContractFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * Filter, which SmartContract to fetch.
     * 
    **/
    where: SmartContractWhereUniqueInput
  }

  /**
   * SmartContract: findUnique
   */
  export interface SmartContractFindUniqueArgs extends SmartContractFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SmartContract base type for findFirst actions
   */
  export type SmartContractFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * Filter, which SmartContract to fetch.
     * 
    **/
    where?: SmartContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmartContracts to fetch.
     * 
    **/
    orderBy?: Enumerable<SmartContractOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SmartContracts.
     * 
    **/
    cursor?: SmartContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmartContracts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmartContracts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SmartContracts.
     * 
    **/
    distinct?: Enumerable<SmartContractScalarFieldEnum>
  }

  /**
   * SmartContract: findFirst
   */
  export interface SmartContractFindFirstArgs extends SmartContractFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SmartContract findMany
   */
  export type SmartContractFindManyArgs = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * Filter, which SmartContracts to fetch.
     * 
    **/
    where?: SmartContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmartContracts to fetch.
     * 
    **/
    orderBy?: Enumerable<SmartContractOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SmartContracts.
     * 
    **/
    cursor?: SmartContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmartContracts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmartContracts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SmartContractScalarFieldEnum>
  }


  /**
   * SmartContract create
   */
  export type SmartContractCreateArgs = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * The data needed to create a SmartContract.
     * 
    **/
    data: XOR<SmartContractCreateInput, SmartContractUncheckedCreateInput>
  }


  /**
   * SmartContract createMany
   */
  export type SmartContractCreateManyArgs = {
    /**
     * The data used to create many SmartContracts.
     * 
    **/
    data: Enumerable<SmartContractCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * SmartContract update
   */
  export type SmartContractUpdateArgs = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * The data needed to update a SmartContract.
     * 
    **/
    data: XOR<SmartContractUpdateInput, SmartContractUncheckedUpdateInput>
    /**
     * Choose, which SmartContract to update.
     * 
    **/
    where: SmartContractWhereUniqueInput
  }


  /**
   * SmartContract updateMany
   */
  export type SmartContractUpdateManyArgs = {
    /**
     * The data used to update SmartContracts.
     * 
    **/
    data: XOR<SmartContractUpdateManyMutationInput, SmartContractUncheckedUpdateManyInput>
    /**
     * Filter which SmartContracts to update
     * 
    **/
    where?: SmartContractWhereInput
  }


  /**
   * SmartContract upsert
   */
  export type SmartContractUpsertArgs = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * The filter to search for the SmartContract to update in case it exists.
     * 
    **/
    where: SmartContractWhereUniqueInput
    /**
     * In case the SmartContract found by the `where` argument doesn't exist, create a new SmartContract with this data.
     * 
    **/
    create: XOR<SmartContractCreateInput, SmartContractUncheckedCreateInput>
    /**
     * In case the SmartContract was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SmartContractUpdateInput, SmartContractUncheckedUpdateInput>
  }


  /**
   * SmartContract delete
   */
  export type SmartContractDeleteArgs = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
    /**
     * Filter which SmartContract to delete.
     * 
    **/
    where: SmartContractWhereUniqueInput
  }


  /**
   * SmartContract deleteMany
   */
  export type SmartContractDeleteManyArgs = {
    /**
     * Filter which SmartContracts to delete
     * 
    **/
    where?: SmartContractWhereInput
  }


  /**
   * SmartContract: findUniqueOrThrow
   */
  export type SmartContractFindUniqueOrThrowArgs = SmartContractFindUniqueArgsBase
      

  /**
   * SmartContract: findFirstOrThrow
   */
  export type SmartContractFindFirstOrThrowArgs = SmartContractFindFirstArgsBase
      

  /**
   * SmartContract without action
   */
  export type SmartContractArgs = {
    /**
     * Select specific fields to fetch from the SmartContract
     * 
    **/
    select?: SmartContractSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SmartContractInclude | null
  }



  /**
   * Model Network
   */


  export type AggregateNetwork = {
    _count: NetworkCountAggregateOutputType | null
    _avg: NetworkAvgAggregateOutputType | null
    _sum: NetworkSumAggregateOutputType | null
    _min: NetworkMinAggregateOutputType | null
    _max: NetworkMaxAggregateOutputType | null
  }

  export type NetworkAvgAggregateOutputType = {
    id: number | null
  }

  export type NetworkSumAggregateOutputType = {
    id: number | null
  }

  export type NetworkMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type NetworkMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type NetworkCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type NetworkAvgAggregateInputType = {
    id?: true
  }

  export type NetworkSumAggregateInputType = {
    id?: true
  }

  export type NetworkMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type NetworkMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type NetworkCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type NetworkAggregateArgs = {
    /**
     * Filter which Network to aggregate.
     * 
    **/
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     * 
    **/
    orderBy?: Enumerable<NetworkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Networks
    **/
    _count?: true | NetworkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NetworkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NetworkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NetworkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NetworkMaxAggregateInputType
  }

  export type GetNetworkAggregateType<T extends NetworkAggregateArgs> = {
        [P in keyof T & keyof AggregateNetwork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNetwork[P]>
      : GetScalarType<T[P], AggregateNetwork[P]>
  }




  export type NetworkGroupByArgs = {
    where?: NetworkWhereInput
    orderBy?: Enumerable<NetworkOrderByWithAggregationInput>
    by: Array<NetworkScalarFieldEnum>
    having?: NetworkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NetworkCountAggregateInputType | true
    _avg?: NetworkAvgAggregateInputType
    _sum?: NetworkSumAggregateInputType
    _min?: NetworkMinAggregateInputType
    _max?: NetworkMaxAggregateInputType
  }


  export type NetworkGroupByOutputType = {
    id: number
    name: string
    _count: NetworkCountAggregateOutputType | null
    _avg: NetworkAvgAggregateOutputType | null
    _sum: NetworkSumAggregateOutputType | null
    _min: NetworkMinAggregateOutputType | null
    _max: NetworkMaxAggregateOutputType | null
  }

  type GetNetworkGroupByPayload<T extends NetworkGroupByArgs> = PrismaPromise<
    Array<
      PickArray<NetworkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NetworkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NetworkGroupByOutputType[P]>
            : GetScalarType<T[P], NetworkGroupByOutputType[P]>
        }
      >
    >


  export type NetworkSelect = {
    id?: boolean
    name?: boolean
    smartContract?: boolean | SmartContractFindManyArgs
    _count?: boolean | NetworkCountOutputTypeArgs
  }

  export type NetworkInclude = {
    smartContract?: boolean | SmartContractFindManyArgs
    _count?: boolean | NetworkCountOutputTypeArgs
  }

  export type NetworkGetPayload<
    S extends boolean | null | undefined | NetworkArgs,
    U = keyof S
      > = S extends true
        ? Network
    : S extends undefined
    ? never
    : S extends NetworkArgs | NetworkFindManyArgs
    ?'include' extends U
    ? Network  & {
    [P in TrueKeys<S['include']>]:
        P extends 'smartContract' ? Array < SmartContractGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? NetworkCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'smartContract' ? Array < SmartContractGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? NetworkCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Network ? Network[P] : never
  } 
    : Network
  : Network


  type NetworkCountArgs = Merge<
    Omit<NetworkFindManyArgs, 'select' | 'include'> & {
      select?: NetworkCountAggregateInputType | true
    }
  >

  export interface NetworkDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Network that matches the filter.
     * @param {NetworkFindUniqueArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NetworkFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NetworkFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Network'> extends True ? CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>> : CheckSelect<T, Prisma__NetworkClient<Network | null, null>, Prisma__NetworkClient<NetworkGetPayload<T> | null, null>>

    /**
     * Find the first Network that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkFindFirstArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NetworkFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NetworkFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Network'> extends True ? CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>> : CheckSelect<T, Prisma__NetworkClient<Network | null, null>, Prisma__NetworkClient<NetworkGetPayload<T> | null, null>>

    /**
     * Find zero or more Networks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Networks
     * const networks = await prisma.network.findMany()
     * 
     * // Get first 10 Networks
     * const networks = await prisma.network.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const networkWithIdOnly = await prisma.network.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NetworkFindManyArgs>(
      args?: SelectSubset<T, NetworkFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Network>>, PrismaPromise<Array<NetworkGetPayload<T>>>>

    /**
     * Create a Network.
     * @param {NetworkCreateArgs} args - Arguments to create a Network.
     * @example
     * // Create one Network
     * const Network = await prisma.network.create({
     *   data: {
     *     // ... data to create a Network
     *   }
     * })
     * 
    **/
    create<T extends NetworkCreateArgs>(
      args: SelectSubset<T, NetworkCreateArgs>
    ): CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>>

    /**
     * Create many Networks.
     *     @param {NetworkCreateManyArgs} args - Arguments to create many Networks.
     *     @example
     *     // Create many Networks
     *     const network = await prisma.network.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NetworkCreateManyArgs>(
      args?: SelectSubset<T, NetworkCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Network.
     * @param {NetworkDeleteArgs} args - Arguments to delete one Network.
     * @example
     * // Delete one Network
     * const Network = await prisma.network.delete({
     *   where: {
     *     // ... filter to delete one Network
     *   }
     * })
     * 
    **/
    delete<T extends NetworkDeleteArgs>(
      args: SelectSubset<T, NetworkDeleteArgs>
    ): CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>>

    /**
     * Update one Network.
     * @param {NetworkUpdateArgs} args - Arguments to update one Network.
     * @example
     * // Update one Network
     * const network = await prisma.network.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NetworkUpdateArgs>(
      args: SelectSubset<T, NetworkUpdateArgs>
    ): CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>>

    /**
     * Delete zero or more Networks.
     * @param {NetworkDeleteManyArgs} args - Arguments to filter Networks to delete.
     * @example
     * // Delete a few Networks
     * const { count } = await prisma.network.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NetworkDeleteManyArgs>(
      args?: SelectSubset<T, NetworkDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Networks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Networks
     * const network = await prisma.network.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NetworkUpdateManyArgs>(
      args: SelectSubset<T, NetworkUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Network.
     * @param {NetworkUpsertArgs} args - Arguments to update or create a Network.
     * @example
     * // Update or create a Network
     * const network = await prisma.network.upsert({
     *   create: {
     *     // ... data to create a Network
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Network we want to update
     *   }
     * })
    **/
    upsert<T extends NetworkUpsertArgs>(
      args: SelectSubset<T, NetworkUpsertArgs>
    ): CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>>

    /**
     * Find one Network that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {NetworkFindUniqueOrThrowArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NetworkFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, NetworkFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>>

    /**
     * Find the first Network that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkFindFirstOrThrowArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NetworkFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NetworkFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__NetworkClient<Network>, Prisma__NetworkClient<NetworkGetPayload<T>>>

    /**
     * Count the number of Networks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkCountArgs} args - Arguments to filter Networks to count.
     * @example
     * // Count the number of Networks
     * const count = await prisma.network.count({
     *   where: {
     *     // ... the filter for the Networks we want to count
     *   }
     * })
    **/
    count<T extends NetworkCountArgs>(
      args?: Subset<T, NetworkCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NetworkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Network.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NetworkAggregateArgs>(args: Subset<T, NetworkAggregateArgs>): PrismaPromise<GetNetworkAggregateType<T>>

    /**
     * Group by Network.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkGroupByArgs} args - Group by arguments.
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
      T extends NetworkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NetworkGroupByArgs['orderBy'] }
        : { orderBy?: NetworkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NetworkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNetworkGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Network.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NetworkClient<T, Null = never> implements PrismaPromise<T> {
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

    smartContract<T extends SmartContractFindManyArgs = {}>(args?: Subset<T, SmartContractFindManyArgs>): CheckSelect<T, PrismaPromise<Array<SmartContract>| Null>, PrismaPromise<Array<SmartContractGetPayload<T>>| Null>>;

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
   * Network base type for findUnique actions
   */
  export type NetworkFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * Filter, which Network to fetch.
     * 
    **/
    where: NetworkWhereUniqueInput
  }

  /**
   * Network: findUnique
   */
  export interface NetworkFindUniqueArgs extends NetworkFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Network base type for findFirst actions
   */
  export type NetworkFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * Filter, which Network to fetch.
     * 
    **/
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     * 
    **/
    orderBy?: Enumerable<NetworkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Networks.
     * 
    **/
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Networks.
     * 
    **/
    distinct?: Enumerable<NetworkScalarFieldEnum>
  }

  /**
   * Network: findFirst
   */
  export interface NetworkFindFirstArgs extends NetworkFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Network findMany
   */
  export type NetworkFindManyArgs = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * Filter, which Networks to fetch.
     * 
    **/
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     * 
    **/
    orderBy?: Enumerable<NetworkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Networks.
     * 
    **/
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NetworkScalarFieldEnum>
  }


  /**
   * Network create
   */
  export type NetworkCreateArgs = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * The data needed to create a Network.
     * 
    **/
    data: XOR<NetworkCreateInput, NetworkUncheckedCreateInput>
  }


  /**
   * Network createMany
   */
  export type NetworkCreateManyArgs = {
    /**
     * The data used to create many Networks.
     * 
    **/
    data: Enumerable<NetworkCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Network update
   */
  export type NetworkUpdateArgs = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * The data needed to update a Network.
     * 
    **/
    data: XOR<NetworkUpdateInput, NetworkUncheckedUpdateInput>
    /**
     * Choose, which Network to update.
     * 
    **/
    where: NetworkWhereUniqueInput
  }


  /**
   * Network updateMany
   */
  export type NetworkUpdateManyArgs = {
    /**
     * The data used to update Networks.
     * 
    **/
    data: XOR<NetworkUpdateManyMutationInput, NetworkUncheckedUpdateManyInput>
    /**
     * Filter which Networks to update
     * 
    **/
    where?: NetworkWhereInput
  }


  /**
   * Network upsert
   */
  export type NetworkUpsertArgs = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * The filter to search for the Network to update in case it exists.
     * 
    **/
    where: NetworkWhereUniqueInput
    /**
     * In case the Network found by the `where` argument doesn't exist, create a new Network with this data.
     * 
    **/
    create: XOR<NetworkCreateInput, NetworkUncheckedCreateInput>
    /**
     * In case the Network was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NetworkUpdateInput, NetworkUncheckedUpdateInput>
  }


  /**
   * Network delete
   */
  export type NetworkDeleteArgs = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
    /**
     * Filter which Network to delete.
     * 
    **/
    where: NetworkWhereUniqueInput
  }


  /**
   * Network deleteMany
   */
  export type NetworkDeleteManyArgs = {
    /**
     * Filter which Networks to delete
     * 
    **/
    where?: NetworkWhereInput
  }


  /**
   * Network: findUniqueOrThrow
   */
  export type NetworkFindUniqueOrThrowArgs = NetworkFindUniqueArgsBase
      

  /**
   * Network: findFirstOrThrow
   */
  export type NetworkFindFirstOrThrowArgs = NetworkFindFirstArgsBase
      

  /**
   * Network without action
   */
  export type NetworkArgs = {
    /**
     * Select specific fields to fetch from the Network
     * 
    **/
    select?: NetworkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: NetworkInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const NetworkScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type NetworkScalarFieldEnum = (typeof NetworkScalarFieldEnum)[keyof typeof NetworkScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SmartContractScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    contractAddress: 'contractAddress',
    networkId: 'networkId'
  };

  export type SmartContractScalarFieldEnum = (typeof SmartContractScalarFieldEnum)[keyof typeof SmartContractScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserOnContractScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    smartContractId: 'smartContractId'
  };

  export type UserOnContractScalarFieldEnum = (typeof UserOnContractScalarFieldEnum)[keyof typeof UserOnContractScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    address: 'address',
    username: 'username',
    description: 'description'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    address?: StringFilter | string
    username?: StringFilter | string
    description?: StringNullableFilter | string | null
    contracts?: UserOnContractListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    username?: SortOrder
    description?: SortOrder
    contracts?: UserOnContractOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    address?: string
    username?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    username?: SortOrder
    description?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    address?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserOnContractWhereInput = {
    AND?: Enumerable<UserOnContractWhereInput>
    OR?: Enumerable<UserOnContractWhereInput>
    NOT?: Enumerable<UserOnContractWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
    smartContract?: XOR<SmartContractRelationFilter, SmartContractWhereInput>
    smartContractId?: IntFilter | number
  }

  export type UserOnContractOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    smartContract?: SmartContractOrderByWithRelationInput
    smartContractId?: SortOrder
  }

  export type UserOnContractWhereUniqueInput = {
    id?: number
  }

  export type UserOnContractOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    smartContractId?: SortOrder
    _count?: UserOnContractCountOrderByAggregateInput
    _avg?: UserOnContractAvgOrderByAggregateInput
    _max?: UserOnContractMaxOrderByAggregateInput
    _min?: UserOnContractMinOrderByAggregateInput
    _sum?: UserOnContractSumOrderByAggregateInput
  }

  export type UserOnContractScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserOnContractScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserOnContractScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserOnContractScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
    smartContractId?: IntWithAggregatesFilter | number
  }

  export type SmartContractWhereInput = {
    AND?: Enumerable<SmartContractWhereInput>
    OR?: Enumerable<SmartContractWhereInput>
    NOT?: Enumerable<SmartContractWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    contractAddress?: StringFilter | string
    network?: XOR<NetworkRelationFilter, NetworkWhereInput>
    networkId?: IntFilter | number
    users?: UserOnContractListRelationFilter
  }

  export type SmartContractOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractAddress?: SortOrder
    network?: NetworkOrderByWithRelationInput
    networkId?: SortOrder
    users?: UserOnContractOrderByRelationAggregateInput
  }

  export type SmartContractWhereUniqueInput = {
    id?: number
    contractAddress?: string
    networkId_contractAddress?: SmartContractNetworkIdContractAddressCompoundUniqueInput
  }

  export type SmartContractOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractAddress?: SortOrder
    networkId?: SortOrder
    _count?: SmartContractCountOrderByAggregateInput
    _avg?: SmartContractAvgOrderByAggregateInput
    _max?: SmartContractMaxOrderByAggregateInput
    _min?: SmartContractMinOrderByAggregateInput
    _sum?: SmartContractSumOrderByAggregateInput
  }

  export type SmartContractScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SmartContractScalarWhereWithAggregatesInput>
    OR?: Enumerable<SmartContractScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SmartContractScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    contractAddress?: StringWithAggregatesFilter | string
    networkId?: IntWithAggregatesFilter | number
  }

  export type NetworkWhereInput = {
    AND?: Enumerable<NetworkWhereInput>
    OR?: Enumerable<NetworkWhereInput>
    NOT?: Enumerable<NetworkWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    smartContract?: SmartContractListRelationFilter
  }

  export type NetworkOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    smartContract?: SmartContractOrderByRelationAggregateInput
  }

  export type NetworkWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type NetworkOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: NetworkCountOrderByAggregateInput
    _avg?: NetworkAvgOrderByAggregateInput
    _max?: NetworkMaxOrderByAggregateInput
    _min?: NetworkMinOrderByAggregateInput
    _sum?: NetworkSumOrderByAggregateInput
  }

  export type NetworkScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NetworkScalarWhereWithAggregatesInput>
    OR?: Enumerable<NetworkScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NetworkScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    username: string
    description?: string | null
    contracts?: UserOnContractCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    username: string
    description?: string | null
    contracts?: UserOnContractUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contracts?: UserOnContractUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contracts?: UserOnContractUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    username: string
    description?: string | null
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserOnContractCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutContractsInput
    smartContract: SmartContractCreateNestedOneWithoutUsersInput
  }

  export type UserOnContractUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    smartContractId: number
  }

  export type UserOnContractUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContractsNestedInput
    smartContract?: SmartContractUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserOnContractUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    smartContractId?: IntFieldUpdateOperationsInput | number
  }

  export type UserOnContractCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    smartContractId: number
  }

  export type UserOnContractUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnContractUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    smartContractId?: IntFieldUpdateOperationsInput | number
  }

  export type SmartContractCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    network: NetworkCreateNestedOneWithoutSmartContractInput
    users?: UserOnContractCreateNestedManyWithoutSmartContractInput
  }

  export type SmartContractUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    networkId: number
    users?: UserOnContractUncheckedCreateNestedManyWithoutSmartContractInput
  }

  export type SmartContractUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    network?: NetworkUpdateOneRequiredWithoutSmartContractNestedInput
    users?: UserOnContractUpdateManyWithoutSmartContractNestedInput
  }

  export type SmartContractUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    networkId?: IntFieldUpdateOperationsInput | number
    users?: UserOnContractUncheckedUpdateManyWithoutSmartContractNestedInput
  }

  export type SmartContractCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    networkId: number
  }

  export type SmartContractUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
  }

  export type SmartContractUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    networkId?: IntFieldUpdateOperationsInput | number
  }

  export type NetworkCreateInput = {
    name: string
    smartContract?: SmartContractCreateNestedManyWithoutNetworkInput
  }

  export type NetworkUncheckedCreateInput = {
    id?: number
    name: string
    smartContract?: SmartContractUncheckedCreateNestedManyWithoutNetworkInput
  }

  export type NetworkUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    smartContract?: SmartContractUpdateManyWithoutNetworkNestedInput
  }

  export type NetworkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    smartContract?: SmartContractUncheckedUpdateManyWithoutNetworkNestedInput
  }

  export type NetworkCreateManyInput = {
    id?: number
    name: string
  }

  export type NetworkUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
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

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type UserOnContractListRelationFilter = {
    every?: UserOnContractWhereInput
    some?: UserOnContractWhereInput
    none?: UserOnContractWhereInput
  }

  export type UserOnContractOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    username?: SortOrder
    description?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    username?: SortOrder
    description?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    username?: SortOrder
    description?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SmartContractRelationFilter = {
    is?: SmartContractWhereInput
    isNot?: SmartContractWhereInput
  }

  export type UserOnContractCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    smartContractId?: SortOrder
  }

  export type UserOnContractAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    smartContractId?: SortOrder
  }

  export type UserOnContractMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    smartContractId?: SortOrder
  }

  export type UserOnContractMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    smartContractId?: SortOrder
  }

  export type UserOnContractSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    smartContractId?: SortOrder
  }

  export type NetworkRelationFilter = {
    is?: NetworkWhereInput
    isNot?: NetworkWhereInput
  }

  export type SmartContractNetworkIdContractAddressCompoundUniqueInput = {
    networkId: number
    contractAddress: string
  }

  export type SmartContractCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractAddress?: SortOrder
    networkId?: SortOrder
  }

  export type SmartContractAvgOrderByAggregateInput = {
    id?: SortOrder
    networkId?: SortOrder
  }

  export type SmartContractMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractAddress?: SortOrder
    networkId?: SortOrder
  }

  export type SmartContractMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractAddress?: SortOrder
    networkId?: SortOrder
  }

  export type SmartContractSumOrderByAggregateInput = {
    id?: SortOrder
    networkId?: SortOrder
  }

  export type SmartContractListRelationFilter = {
    every?: SmartContractWhereInput
    some?: SmartContractWhereInput
    none?: SmartContractWhereInput
  }

  export type SmartContractOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NetworkCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type NetworkAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NetworkMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type NetworkMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type NetworkSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserOnContractCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutUserInput>, Enumerable<UserOnContractUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutUserInput>
    createMany?: UserOnContractCreateManyUserInputEnvelope
    connect?: Enumerable<UserOnContractWhereUniqueInput>
  }

  export type UserOnContractUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutUserInput>, Enumerable<UserOnContractUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutUserInput>
    createMany?: UserOnContractCreateManyUserInputEnvelope
    connect?: Enumerable<UserOnContractWhereUniqueInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserOnContractUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutUserInput>, Enumerable<UserOnContractUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserOnContractUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserOnContractCreateManyUserInputEnvelope
    set?: Enumerable<UserOnContractWhereUniqueInput>
    disconnect?: Enumerable<UserOnContractWhereUniqueInput>
    delete?: Enumerable<UserOnContractWhereUniqueInput>
    connect?: Enumerable<UserOnContractWhereUniqueInput>
    update?: Enumerable<UserOnContractUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserOnContractUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserOnContractScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserOnContractUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutUserInput>, Enumerable<UserOnContractUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserOnContractUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserOnContractCreateManyUserInputEnvelope
    set?: Enumerable<UserOnContractWhereUniqueInput>
    disconnect?: Enumerable<UserOnContractWhereUniqueInput>
    delete?: Enumerable<UserOnContractWhereUniqueInput>
    connect?: Enumerable<UserOnContractWhereUniqueInput>
    update?: Enumerable<UserOnContractUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserOnContractUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserOnContractScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutContractsInput = {
    create?: XOR<UserCreateWithoutContractsInput, UserUncheckedCreateWithoutContractsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContractsInput
    connect?: UserWhereUniqueInput
  }

  export type SmartContractCreateNestedOneWithoutUsersInput = {
    create?: XOR<SmartContractCreateWithoutUsersInput, SmartContractUncheckedCreateWithoutUsersInput>
    connectOrCreate?: SmartContractCreateOrConnectWithoutUsersInput
    connect?: SmartContractWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutContractsNestedInput = {
    create?: XOR<UserCreateWithoutContractsInput, UserUncheckedCreateWithoutContractsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContractsInput
    upsert?: UserUpsertWithoutContractsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutContractsInput, UserUncheckedUpdateWithoutContractsInput>
  }

  export type SmartContractUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<SmartContractCreateWithoutUsersInput, SmartContractUncheckedCreateWithoutUsersInput>
    connectOrCreate?: SmartContractCreateOrConnectWithoutUsersInput
    upsert?: SmartContractUpsertWithoutUsersInput
    connect?: SmartContractWhereUniqueInput
    update?: XOR<SmartContractUpdateWithoutUsersInput, SmartContractUncheckedUpdateWithoutUsersInput>
  }

  export type NetworkCreateNestedOneWithoutSmartContractInput = {
    create?: XOR<NetworkCreateWithoutSmartContractInput, NetworkUncheckedCreateWithoutSmartContractInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutSmartContractInput
    connect?: NetworkWhereUniqueInput
  }

  export type UserOnContractCreateNestedManyWithoutSmartContractInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutSmartContractInput>, Enumerable<UserOnContractUncheckedCreateWithoutSmartContractInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutSmartContractInput>
    createMany?: UserOnContractCreateManySmartContractInputEnvelope
    connect?: Enumerable<UserOnContractWhereUniqueInput>
  }

  export type UserOnContractUncheckedCreateNestedManyWithoutSmartContractInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutSmartContractInput>, Enumerable<UserOnContractUncheckedCreateWithoutSmartContractInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutSmartContractInput>
    createMany?: UserOnContractCreateManySmartContractInputEnvelope
    connect?: Enumerable<UserOnContractWhereUniqueInput>
  }

  export type NetworkUpdateOneRequiredWithoutSmartContractNestedInput = {
    create?: XOR<NetworkCreateWithoutSmartContractInput, NetworkUncheckedCreateWithoutSmartContractInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutSmartContractInput
    upsert?: NetworkUpsertWithoutSmartContractInput
    connect?: NetworkWhereUniqueInput
    update?: XOR<NetworkUpdateWithoutSmartContractInput, NetworkUncheckedUpdateWithoutSmartContractInput>
  }

  export type UserOnContractUpdateManyWithoutSmartContractNestedInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutSmartContractInput>, Enumerable<UserOnContractUncheckedCreateWithoutSmartContractInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutSmartContractInput>
    upsert?: Enumerable<UserOnContractUpsertWithWhereUniqueWithoutSmartContractInput>
    createMany?: UserOnContractCreateManySmartContractInputEnvelope
    set?: Enumerable<UserOnContractWhereUniqueInput>
    disconnect?: Enumerable<UserOnContractWhereUniqueInput>
    delete?: Enumerable<UserOnContractWhereUniqueInput>
    connect?: Enumerable<UserOnContractWhereUniqueInput>
    update?: Enumerable<UserOnContractUpdateWithWhereUniqueWithoutSmartContractInput>
    updateMany?: Enumerable<UserOnContractUpdateManyWithWhereWithoutSmartContractInput>
    deleteMany?: Enumerable<UserOnContractScalarWhereInput>
  }

  export type UserOnContractUncheckedUpdateManyWithoutSmartContractNestedInput = {
    create?: XOR<Enumerable<UserOnContractCreateWithoutSmartContractInput>, Enumerable<UserOnContractUncheckedCreateWithoutSmartContractInput>>
    connectOrCreate?: Enumerable<UserOnContractCreateOrConnectWithoutSmartContractInput>
    upsert?: Enumerable<UserOnContractUpsertWithWhereUniqueWithoutSmartContractInput>
    createMany?: UserOnContractCreateManySmartContractInputEnvelope
    set?: Enumerable<UserOnContractWhereUniqueInput>
    disconnect?: Enumerable<UserOnContractWhereUniqueInput>
    delete?: Enumerable<UserOnContractWhereUniqueInput>
    connect?: Enumerable<UserOnContractWhereUniqueInput>
    update?: Enumerable<UserOnContractUpdateWithWhereUniqueWithoutSmartContractInput>
    updateMany?: Enumerable<UserOnContractUpdateManyWithWhereWithoutSmartContractInput>
    deleteMany?: Enumerable<UserOnContractScalarWhereInput>
  }

  export type SmartContractCreateNestedManyWithoutNetworkInput = {
    create?: XOR<Enumerable<SmartContractCreateWithoutNetworkInput>, Enumerable<SmartContractUncheckedCreateWithoutNetworkInput>>
    connectOrCreate?: Enumerable<SmartContractCreateOrConnectWithoutNetworkInput>
    createMany?: SmartContractCreateManyNetworkInputEnvelope
    connect?: Enumerable<SmartContractWhereUniqueInput>
  }

  export type SmartContractUncheckedCreateNestedManyWithoutNetworkInput = {
    create?: XOR<Enumerable<SmartContractCreateWithoutNetworkInput>, Enumerable<SmartContractUncheckedCreateWithoutNetworkInput>>
    connectOrCreate?: Enumerable<SmartContractCreateOrConnectWithoutNetworkInput>
    createMany?: SmartContractCreateManyNetworkInputEnvelope
    connect?: Enumerable<SmartContractWhereUniqueInput>
  }

  export type SmartContractUpdateManyWithoutNetworkNestedInput = {
    create?: XOR<Enumerable<SmartContractCreateWithoutNetworkInput>, Enumerable<SmartContractUncheckedCreateWithoutNetworkInput>>
    connectOrCreate?: Enumerable<SmartContractCreateOrConnectWithoutNetworkInput>
    upsert?: Enumerable<SmartContractUpsertWithWhereUniqueWithoutNetworkInput>
    createMany?: SmartContractCreateManyNetworkInputEnvelope
    set?: Enumerable<SmartContractWhereUniqueInput>
    disconnect?: Enumerable<SmartContractWhereUniqueInput>
    delete?: Enumerable<SmartContractWhereUniqueInput>
    connect?: Enumerable<SmartContractWhereUniqueInput>
    update?: Enumerable<SmartContractUpdateWithWhereUniqueWithoutNetworkInput>
    updateMany?: Enumerable<SmartContractUpdateManyWithWhereWithoutNetworkInput>
    deleteMany?: Enumerable<SmartContractScalarWhereInput>
  }

  export type SmartContractUncheckedUpdateManyWithoutNetworkNestedInput = {
    create?: XOR<Enumerable<SmartContractCreateWithoutNetworkInput>, Enumerable<SmartContractUncheckedCreateWithoutNetworkInput>>
    connectOrCreate?: Enumerable<SmartContractCreateOrConnectWithoutNetworkInput>
    upsert?: Enumerable<SmartContractUpsertWithWhereUniqueWithoutNetworkInput>
    createMany?: SmartContractCreateManyNetworkInputEnvelope
    set?: Enumerable<SmartContractWhereUniqueInput>
    disconnect?: Enumerable<SmartContractWhereUniqueInput>
    delete?: Enumerable<SmartContractWhereUniqueInput>
    connect?: Enumerable<SmartContractWhereUniqueInput>
    update?: Enumerable<SmartContractUpdateWithWhereUniqueWithoutNetworkInput>
    updateMany?: Enumerable<SmartContractUpdateManyWithWhereWithoutNetworkInput>
    deleteMany?: Enumerable<SmartContractScalarWhereInput>
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

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
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

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserOnContractCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    smartContract: SmartContractCreateNestedOneWithoutUsersInput
  }

  export type UserOnContractUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    smartContractId: number
  }

  export type UserOnContractCreateOrConnectWithoutUserInput = {
    where: UserOnContractWhereUniqueInput
    create: XOR<UserOnContractCreateWithoutUserInput, UserOnContractUncheckedCreateWithoutUserInput>
  }

  export type UserOnContractCreateManyUserInputEnvelope = {
    data: Enumerable<UserOnContractCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserOnContractUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOnContractWhereUniqueInput
    update: XOR<UserOnContractUpdateWithoutUserInput, UserOnContractUncheckedUpdateWithoutUserInput>
    create: XOR<UserOnContractCreateWithoutUserInput, UserOnContractUncheckedCreateWithoutUserInput>
  }

  export type UserOnContractUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOnContractWhereUniqueInput
    data: XOR<UserOnContractUpdateWithoutUserInput, UserOnContractUncheckedUpdateWithoutUserInput>
  }

  export type UserOnContractUpdateManyWithWhereWithoutUserInput = {
    where: UserOnContractScalarWhereInput
    data: XOR<UserOnContractUpdateManyMutationInput, UserOnContractUncheckedUpdateManyWithoutContractsInput>
  }

  export type UserOnContractScalarWhereInput = {
    AND?: Enumerable<UserOnContractScalarWhereInput>
    OR?: Enumerable<UserOnContractScalarWhereInput>
    NOT?: Enumerable<UserOnContractScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
    smartContractId?: IntFilter | number
  }

  export type UserCreateWithoutContractsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    username: string
    description?: string | null
  }

  export type UserUncheckedCreateWithoutContractsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    username: string
    description?: string | null
  }

  export type UserCreateOrConnectWithoutContractsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContractsInput, UserUncheckedCreateWithoutContractsInput>
  }

  export type SmartContractCreateWithoutUsersInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    network: NetworkCreateNestedOneWithoutSmartContractInput
  }

  export type SmartContractUncheckedCreateWithoutUsersInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    networkId: number
  }

  export type SmartContractCreateOrConnectWithoutUsersInput = {
    where: SmartContractWhereUniqueInput
    create: XOR<SmartContractCreateWithoutUsersInput, SmartContractUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutContractsInput = {
    update: XOR<UserUpdateWithoutContractsInput, UserUncheckedUpdateWithoutContractsInput>
    create: XOR<UserCreateWithoutContractsInput, UserUncheckedCreateWithoutContractsInput>
  }

  export type UserUpdateWithoutContractsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutContractsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SmartContractUpsertWithoutUsersInput = {
    update: XOR<SmartContractUpdateWithoutUsersInput, SmartContractUncheckedUpdateWithoutUsersInput>
    create: XOR<SmartContractCreateWithoutUsersInput, SmartContractUncheckedCreateWithoutUsersInput>
  }

  export type SmartContractUpdateWithoutUsersInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    network?: NetworkUpdateOneRequiredWithoutSmartContractNestedInput
  }

  export type SmartContractUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    networkId?: IntFieldUpdateOperationsInput | number
  }

  export type NetworkCreateWithoutSmartContractInput = {
    name: string
  }

  export type NetworkUncheckedCreateWithoutSmartContractInput = {
    id?: number
    name: string
  }

  export type NetworkCreateOrConnectWithoutSmartContractInput = {
    where: NetworkWhereUniqueInput
    create: XOR<NetworkCreateWithoutSmartContractInput, NetworkUncheckedCreateWithoutSmartContractInput>
  }

  export type UserOnContractCreateWithoutSmartContractInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutContractsInput
  }

  export type UserOnContractUncheckedCreateWithoutSmartContractInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type UserOnContractCreateOrConnectWithoutSmartContractInput = {
    where: UserOnContractWhereUniqueInput
    create: XOR<UserOnContractCreateWithoutSmartContractInput, UserOnContractUncheckedCreateWithoutSmartContractInput>
  }

  export type UserOnContractCreateManySmartContractInputEnvelope = {
    data: Enumerable<UserOnContractCreateManySmartContractInput>
    skipDuplicates?: boolean
  }

  export type NetworkUpsertWithoutSmartContractInput = {
    update: XOR<NetworkUpdateWithoutSmartContractInput, NetworkUncheckedUpdateWithoutSmartContractInput>
    create: XOR<NetworkCreateWithoutSmartContractInput, NetworkUncheckedCreateWithoutSmartContractInput>
  }

  export type NetworkUpdateWithoutSmartContractInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkUncheckedUpdateWithoutSmartContractInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnContractUpsertWithWhereUniqueWithoutSmartContractInput = {
    where: UserOnContractWhereUniqueInput
    update: XOR<UserOnContractUpdateWithoutSmartContractInput, UserOnContractUncheckedUpdateWithoutSmartContractInput>
    create: XOR<UserOnContractCreateWithoutSmartContractInput, UserOnContractUncheckedCreateWithoutSmartContractInput>
  }

  export type UserOnContractUpdateWithWhereUniqueWithoutSmartContractInput = {
    where: UserOnContractWhereUniqueInput
    data: XOR<UserOnContractUpdateWithoutSmartContractInput, UserOnContractUncheckedUpdateWithoutSmartContractInput>
  }

  export type UserOnContractUpdateManyWithWhereWithoutSmartContractInput = {
    where: UserOnContractScalarWhereInput
    data: XOR<UserOnContractUpdateManyMutationInput, UserOnContractUncheckedUpdateManyWithoutUsersInput>
  }

  export type SmartContractCreateWithoutNetworkInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    users?: UserOnContractCreateNestedManyWithoutSmartContractInput
  }

  export type SmartContractUncheckedCreateWithoutNetworkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
    users?: UserOnContractUncheckedCreateNestedManyWithoutSmartContractInput
  }

  export type SmartContractCreateOrConnectWithoutNetworkInput = {
    where: SmartContractWhereUniqueInput
    create: XOR<SmartContractCreateWithoutNetworkInput, SmartContractUncheckedCreateWithoutNetworkInput>
  }

  export type SmartContractCreateManyNetworkInputEnvelope = {
    data: Enumerable<SmartContractCreateManyNetworkInput>
    skipDuplicates?: boolean
  }

  export type SmartContractUpsertWithWhereUniqueWithoutNetworkInput = {
    where: SmartContractWhereUniqueInput
    update: XOR<SmartContractUpdateWithoutNetworkInput, SmartContractUncheckedUpdateWithoutNetworkInput>
    create: XOR<SmartContractCreateWithoutNetworkInput, SmartContractUncheckedCreateWithoutNetworkInput>
  }

  export type SmartContractUpdateWithWhereUniqueWithoutNetworkInput = {
    where: SmartContractWhereUniqueInput
    data: XOR<SmartContractUpdateWithoutNetworkInput, SmartContractUncheckedUpdateWithoutNetworkInput>
  }

  export type SmartContractUpdateManyWithWhereWithoutNetworkInput = {
    where: SmartContractScalarWhereInput
    data: XOR<SmartContractUpdateManyMutationInput, SmartContractUncheckedUpdateManyWithoutSmartContractInput>
  }

  export type SmartContractScalarWhereInput = {
    AND?: Enumerable<SmartContractScalarWhereInput>
    OR?: Enumerable<SmartContractScalarWhereInput>
    NOT?: Enumerable<SmartContractScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    contractAddress?: StringFilter | string
    networkId?: IntFilter | number
  }

  export type UserOnContractCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    smartContractId: number
  }

  export type UserOnContractUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    smartContract?: SmartContractUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserOnContractUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    smartContractId?: IntFieldUpdateOperationsInput | number
  }

  export type UserOnContractUncheckedUpdateManyWithoutContractsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    smartContractId?: IntFieldUpdateOperationsInput | number
  }

  export type UserOnContractCreateManySmartContractInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type UserOnContractUpdateWithoutSmartContractInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContractsNestedInput
  }

  export type UserOnContractUncheckedUpdateWithoutSmartContractInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserOnContractUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SmartContractCreateManyNetworkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contractAddress: string
  }

  export type SmartContractUpdateWithoutNetworkInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    users?: UserOnContractUpdateManyWithoutSmartContractNestedInput
  }

  export type SmartContractUncheckedUpdateWithoutNetworkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
    users?: UserOnContractUncheckedUpdateManyWithoutSmartContractNestedInput
  }

  export type SmartContractUncheckedUpdateManyWithoutSmartContractInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractAddress?: StringFieldUpdateOperationsInput | string
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