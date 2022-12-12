/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ethermint.evm.v1";

/** Params defines the EVM module parameters */
export interface Params {
  /**
   * evm denom represents the token denomination used to run the EVM state
   * transitions.
   */
  evmDenom: string;
  /** enable create toggles state transitions that use the vm.Create function */
  enableCreate: boolean;
  /** enable call toggles state transitions that use the vm.Call function */
  enableCall: boolean;
  /** extra eips defines the additional EIPs for the vm.Config */
  extraEips: Long[];
  /** chain config defines the EVM chain configuration parameters */
  chainConfig?: ChainConfig;
}

/**
 * ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
 * instead of *big.Int.
 */
export interface ChainConfig {
  /** Homestead switch block (nil no fork, 0 = already homestead) */
  homesteadBlock: string;
  /** TheDAO hard-fork switch block (nil no fork) */
  daoForkBlock: string;
  /** Whether the nodes supports or opposes the DAO hard-fork */
  daoForkSupport: boolean;
  /**
   * EIP150 implements the Gas price changes
   * (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork)
   */
  eip150Block: string;
  /** EIP150 HF hash (needed for header only clients as only gas pricing changed) */
  eip150Hash: string;
  /** EIP155Block HF block */
  eip155Block: string;
  /** EIP158 HF block */
  eip158Block: string;
  /** Byzantium switch block (nil no fork, 0 = already on byzantium) */
  byzantiumBlock: string;
  /** Constantinople switch block (nil no fork, 0 = already activated) */
  constantinopleBlock: string;
  /** Petersburg switch block (nil same as Constantinople) */
  petersburgBlock: string;
  /** Istanbul switch block (nil no fork, 0 = already on istanbul) */
  istanbulBlock: string;
  /** Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated) */
  muirGlacierBlock: string;
  /** Berlin switch block (nil = no fork, 0 = already on berlin) */
  berlinBlock: string;
  /** London switch block (nil = no fork, 0 = already on london) */
  londonBlock: string;
  /** Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated) */
  arrowGlacierBlock: string;
  /** EIP-3675 (TheMerge) switch block (nil = no fork, 0 = already in merge proceedings) */
  mergeForkBlock: string;
}

/** State represents a single Storage key value pair item. */
export interface State {
  key: string;
  value: string;
}

/**
 * TransactionLogs define the logs generated from a transaction execution
 * with a given hash. It it used for import/export data as transactions are not
 * persisted on blockchain state after an upgrade.
 */
export interface TransactionLogs {
  hash: string;
  logs: Log[];
}

/**
 * Log represents an protobuf compatible Ethereum Log that defines a contract
 * log event. These events are generated by the LOG opcode and stored/indexed by
 * the node.
 */
export interface Log {
  /** address of the contract that generated the event */
  address: string;
  /** list of topics provided by the contract. */
  topics: string[];
  /** supplied by the contract, usually ABI-encoded */
  data: Uint8Array;
  /** block in which the transaction was included */
  blockNumber: Long;
  /** hash of the transaction */
  txHash: string;
  /** index of the transaction in the block */
  txIndex: Long;
  /** hash of the block in which the transaction was included */
  blockHash: string;
  /** index of the log in the block */
  index: Long;
  /**
   * The Removed field is true if this log was reverted due to a chain
   * reorganisation. You must pay attention to this field if you receive logs
   * through a filter query.
   */
  removed: boolean;
}

/** TxResult stores results of Tx execution. */
export interface TxResult {
  /**
   * contract_address contains the ethereum address of the created contract (if
   * any). If the state transition is an evm.Call, the contract address will be
   * empty.
   */
  contractAddress: string;
  /** bloom represents the bloom filter bytes */
  bloom: Uint8Array;
  /**
   * tx_logs contains the transaction hash and the proto-compatible ethereum
   * logs.
   */
  txLogs?: TransactionLogs;
  /** ret defines the bytes from the execution. */
  ret: Uint8Array;
  /** reverted flag is set to true when the call has been reverted */
  reverted: boolean;
  /** gas_used notes the amount of gas consumed while execution */
  gasUsed: Long;
}

/** AccessTuple is the element type of an access list. */
export interface AccessTuple {
  /** hex formatted ethereum address */
  address: string;
  /** hex formatted hashes of the storage keys */
  storageKeys: string[];
}

/** TraceConfig holds extra parameters to trace functions. */
export interface TraceConfig {
  /** custom javascript tracer */
  tracer: string;
  /**
   * overrides the default timeout of 5 seconds for JavaScript-based tracing
   * calls
   */
  timeout: string;
  /** number of blocks the tracer is willing to go back */
  reexec: Long;
  /** disable stack capture */
  disableStack: boolean;
  /** disable storage capture */
  disableStorage: boolean;
  /** print output during capture end */
  debug: boolean;
  /** maximum length of output, but zero means unlimited */
  limit: number;
  /** Chain overrides, can be used to execute a trace using future fork rules */
  overrides?: ChainConfig;
  /** enable memory capture */
  enableMemory: boolean;
  /** enable return data capture */
  enableReturnData: boolean;
}

function createBaseParams(): Params {
  return {
    evmDenom: "",
    enableCreate: false,
    enableCall: false,
    extraEips: [],
    chainConfig: undefined,
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.evmDenom !== "") {
      writer.uint32(10).string(message.evmDenom);
    }
    if (message.enableCreate === true) {
      writer.uint32(16).bool(message.enableCreate);
    }
    if (message.enableCall === true) {
      writer.uint32(24).bool(message.enableCall);
    }
    writer.uint32(34).fork();
    for (const v of message.extraEips) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.chainConfig !== undefined) {
      ChainConfig.encode(
        message.chainConfig,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.evmDenom = reader.string();
          break;
        case 2:
          message.enableCreate = reader.bool();
          break;
        case 3:
          message.enableCall = reader.bool();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.extraEips.push(reader.int64() as Long);
            }
          } else {
            message.extraEips.push(reader.int64() as Long);
          }
          break;
        case 5:
          message.chainConfig = ChainConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      evmDenom: isSet(object.evmDenom) ? String(object.evmDenom) : "",
      enableCreate: isSet(object.enableCreate)
        ? Boolean(object.enableCreate)
        : false,
      enableCall: isSet(object.enableCall) ? Boolean(object.enableCall) : false,
      extraEips: Array.isArray(object?.extraEips)
        ? object.extraEips.map((e: any) => Long.fromValue(e))
        : [],
      chainConfig: isSet(object.chainConfig)
        ? ChainConfig.fromJSON(object.chainConfig)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.evmDenom !== undefined && (obj.evmDenom = message.evmDenom);
    message.enableCreate !== undefined &&
      (obj.enableCreate = message.enableCreate);
    message.enableCall !== undefined && (obj.enableCall = message.enableCall);
    if (message.extraEips) {
      obj.extraEips = message.extraEips.map((e) => (e || Long.ZERO).toString());
    } else {
      obj.extraEips = [];
    }
    message.chainConfig !== undefined &&
      (obj.chainConfig = message.chainConfig
        ? ChainConfig.toJSON(message.chainConfig)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.evmDenom = object.evmDenom ?? "";
    message.enableCreate = object.enableCreate ?? false;
    message.enableCall = object.enableCall ?? false;
    message.extraEips = object.extraEips?.map((e) => Long.fromValue(e)) || [];
    message.chainConfig =
      object.chainConfig !== undefined && object.chainConfig !== null
        ? ChainConfig.fromPartial(object.chainConfig)
        : undefined;
    return message;
  },
};

function createBaseChainConfig(): ChainConfig {
  return {
    homesteadBlock: "",
    daoForkBlock: "",
    daoForkSupport: false,
    eip150Block: "",
    eip150Hash: "",
    eip155Block: "",
    eip158Block: "",
    byzantiumBlock: "",
    constantinopleBlock: "",
    petersburgBlock: "",
    istanbulBlock: "",
    muirGlacierBlock: "",
    berlinBlock: "",
    londonBlock: "",
    arrowGlacierBlock: "",
    mergeForkBlock: "",
  };
}

export const ChainConfig = {
  encode(
    message: ChainConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.homesteadBlock !== "") {
      writer.uint32(10).string(message.homesteadBlock);
    }
    if (message.daoForkBlock !== "") {
      writer.uint32(18).string(message.daoForkBlock);
    }
    if (message.daoForkSupport === true) {
      writer.uint32(24).bool(message.daoForkSupport);
    }
    if (message.eip150Block !== "") {
      writer.uint32(34).string(message.eip150Block);
    }
    if (message.eip150Hash !== "") {
      writer.uint32(42).string(message.eip150Hash);
    }
    if (message.eip155Block !== "") {
      writer.uint32(50).string(message.eip155Block);
    }
    if (message.eip158Block !== "") {
      writer.uint32(58).string(message.eip158Block);
    }
    if (message.byzantiumBlock !== "") {
      writer.uint32(66).string(message.byzantiumBlock);
    }
    if (message.constantinopleBlock !== "") {
      writer.uint32(74).string(message.constantinopleBlock);
    }
    if (message.petersburgBlock !== "") {
      writer.uint32(82).string(message.petersburgBlock);
    }
    if (message.istanbulBlock !== "") {
      writer.uint32(90).string(message.istanbulBlock);
    }
    if (message.muirGlacierBlock !== "") {
      writer.uint32(98).string(message.muirGlacierBlock);
    }
    if (message.berlinBlock !== "") {
      writer.uint32(106).string(message.berlinBlock);
    }
    if (message.londonBlock !== "") {
      writer.uint32(138).string(message.londonBlock);
    }
    if (message.arrowGlacierBlock !== "") {
      writer.uint32(146).string(message.arrowGlacierBlock);
    }
    if (message.mergeForkBlock !== "") {
      writer.uint32(154).string(message.mergeForkBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChainConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChainConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.homesteadBlock = reader.string();
          break;
        case 2:
          message.daoForkBlock = reader.string();
          break;
        case 3:
          message.daoForkSupport = reader.bool();
          break;
        case 4:
          message.eip150Block = reader.string();
          break;
        case 5:
          message.eip150Hash = reader.string();
          break;
        case 6:
          message.eip155Block = reader.string();
          break;
        case 7:
          message.eip158Block = reader.string();
          break;
        case 8:
          message.byzantiumBlock = reader.string();
          break;
        case 9:
          message.constantinopleBlock = reader.string();
          break;
        case 10:
          message.petersburgBlock = reader.string();
          break;
        case 11:
          message.istanbulBlock = reader.string();
          break;
        case 12:
          message.muirGlacierBlock = reader.string();
          break;
        case 13:
          message.berlinBlock = reader.string();
          break;
        case 17:
          message.londonBlock = reader.string();
          break;
        case 18:
          message.arrowGlacierBlock = reader.string();
          break;
        case 19:
          message.mergeForkBlock = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChainConfig {
    return {
      homesteadBlock: isSet(object.homesteadBlock)
        ? String(object.homesteadBlock)
        : "",
      daoForkBlock: isSet(object.daoForkBlock)
        ? String(object.daoForkBlock)
        : "",
      daoForkSupport: isSet(object.daoForkSupport)
        ? Boolean(object.daoForkSupport)
        : false,
      eip150Block: isSet(object.eip150Block) ? String(object.eip150Block) : "",
      eip150Hash: isSet(object.eip150Hash) ? String(object.eip150Hash) : "",
      eip155Block: isSet(object.eip155Block) ? String(object.eip155Block) : "",
      eip158Block: isSet(object.eip158Block) ? String(object.eip158Block) : "",
      byzantiumBlock: isSet(object.byzantiumBlock)
        ? String(object.byzantiumBlock)
        : "",
      constantinopleBlock: isSet(object.constantinopleBlock)
        ? String(object.constantinopleBlock)
        : "",
      petersburgBlock: isSet(object.petersburgBlock)
        ? String(object.petersburgBlock)
        : "",
      istanbulBlock: isSet(object.istanbulBlock)
        ? String(object.istanbulBlock)
        : "",
      muirGlacierBlock: isSet(object.muirGlacierBlock)
        ? String(object.muirGlacierBlock)
        : "",
      berlinBlock: isSet(object.berlinBlock) ? String(object.berlinBlock) : "",
      londonBlock: isSet(object.londonBlock) ? String(object.londonBlock) : "",
      arrowGlacierBlock: isSet(object.arrowGlacierBlock)
        ? String(object.arrowGlacierBlock)
        : "",
      mergeForkBlock: isSet(object.mergeForkBlock)
        ? String(object.mergeForkBlock)
        : "",
    };
  },

  toJSON(message: ChainConfig): unknown {
    const obj: any = {};
    message.homesteadBlock !== undefined &&
      (obj.homesteadBlock = message.homesteadBlock);
    message.daoForkBlock !== undefined &&
      (obj.daoForkBlock = message.daoForkBlock);
    message.daoForkSupport !== undefined &&
      (obj.daoForkSupport = message.daoForkSupport);
    message.eip150Block !== undefined &&
      (obj.eip150Block = message.eip150Block);
    message.eip150Hash !== undefined && (obj.eip150Hash = message.eip150Hash);
    message.eip155Block !== undefined &&
      (obj.eip155Block = message.eip155Block);
    message.eip158Block !== undefined &&
      (obj.eip158Block = message.eip158Block);
    message.byzantiumBlock !== undefined &&
      (obj.byzantiumBlock = message.byzantiumBlock);
    message.constantinopleBlock !== undefined &&
      (obj.constantinopleBlock = message.constantinopleBlock);
    message.petersburgBlock !== undefined &&
      (obj.petersburgBlock = message.petersburgBlock);
    message.istanbulBlock !== undefined &&
      (obj.istanbulBlock = message.istanbulBlock);
    message.muirGlacierBlock !== undefined &&
      (obj.muirGlacierBlock = message.muirGlacierBlock);
    message.berlinBlock !== undefined &&
      (obj.berlinBlock = message.berlinBlock);
    message.londonBlock !== undefined &&
      (obj.londonBlock = message.londonBlock);
    message.arrowGlacierBlock !== undefined &&
      (obj.arrowGlacierBlock = message.arrowGlacierBlock);
    message.mergeForkBlock !== undefined &&
      (obj.mergeForkBlock = message.mergeForkBlock);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChainConfig>, I>>(
    object: I
  ): ChainConfig {
    const message = createBaseChainConfig();
    message.homesteadBlock = object.homesteadBlock ?? "";
    message.daoForkBlock = object.daoForkBlock ?? "";
    message.daoForkSupport = object.daoForkSupport ?? false;
    message.eip150Block = object.eip150Block ?? "";
    message.eip150Hash = object.eip150Hash ?? "";
    message.eip155Block = object.eip155Block ?? "";
    message.eip158Block = object.eip158Block ?? "";
    message.byzantiumBlock = object.byzantiumBlock ?? "";
    message.constantinopleBlock = object.constantinopleBlock ?? "";
    message.petersburgBlock = object.petersburgBlock ?? "";
    message.istanbulBlock = object.istanbulBlock ?? "";
    message.muirGlacierBlock = object.muirGlacierBlock ?? "";
    message.berlinBlock = object.berlinBlock ?? "";
    message.londonBlock = object.londonBlock ?? "";
    message.arrowGlacierBlock = object.arrowGlacierBlock ?? "";
    message.mergeForkBlock = object.mergeForkBlock ?? "";
    return message;
  },
};

function createBaseState(): State {
  return { key: "", value: "" };
}

export const State = {
  encode(message: State, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): State {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State>, I>>(object: I): State {
    const message = createBaseState();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseTransactionLogs(): TransactionLogs {
  return { hash: "", logs: [] };
}

export const TransactionLogs = {
  encode(
    message: TransactionLogs,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    for (const v of message.logs) {
      Log.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionLogs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionLogs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.logs.push(Log.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionLogs {
    return {
      hash: isSet(object.hash) ? String(object.hash) : "",
      logs: Array.isArray(object?.logs)
        ? object.logs.map((e: any) => Log.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TransactionLogs): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    if (message.logs) {
      obj.logs = message.logs.map((e) => (e ? Log.toJSON(e) : undefined));
    } else {
      obj.logs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionLogs>, I>>(
    object: I
  ): TransactionLogs {
    const message = createBaseTransactionLogs();
    message.hash = object.hash ?? "";
    message.logs = object.logs?.map((e) => Log.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLog(): Log {
  return {
    address: "",
    topics: [],
    data: new Uint8Array(),
    blockNumber: Long.UZERO,
    txHash: "",
    txIndex: Long.UZERO,
    blockHash: "",
    index: Long.UZERO,
    removed: false,
  };
}

export const Log = {
  encode(message: Log, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.topics) {
      writer.uint32(18).string(v!);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (!message.blockNumber.isZero()) {
      writer.uint32(32).uint64(message.blockNumber);
    }
    if (message.txHash !== "") {
      writer.uint32(42).string(message.txHash);
    }
    if (!message.txIndex.isZero()) {
      writer.uint32(48).uint64(message.txIndex);
    }
    if (message.blockHash !== "") {
      writer.uint32(58).string(message.blockHash);
    }
    if (!message.index.isZero()) {
      writer.uint32(64).uint64(message.index);
    }
    if (message.removed === true) {
      writer.uint32(72).bool(message.removed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Log {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.topics.push(reader.string());
          break;
        case 3:
          message.data = reader.bytes();
          break;
        case 4:
          message.blockNumber = reader.uint64() as Long;
          break;
        case 5:
          message.txHash = reader.string();
          break;
        case 6:
          message.txIndex = reader.uint64() as Long;
          break;
        case 7:
          message.blockHash = reader.string();
          break;
        case 8:
          message.index = reader.uint64() as Long;
          break;
        case 9:
          message.removed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Log {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      topics: Array.isArray(object?.topics)
        ? object.topics.map((e: any) => String(e))
        : [],
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      blockNumber: isSet(object.blockNumber)
        ? Long.fromValue(object.blockNumber)
        : Long.UZERO,
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      txIndex: isSet(object.txIndex)
        ? Long.fromValue(object.txIndex)
        : Long.UZERO,
      blockHash: isSet(object.blockHash) ? String(object.blockHash) : "",
      index: isSet(object.index) ? Long.fromValue(object.index) : Long.UZERO,
      removed: isSet(object.removed) ? Boolean(object.removed) : false,
    };
  },

  toJSON(message: Log): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.topics) {
      obj.topics = message.topics.map((e) => e);
    } else {
      obj.topics = [];
    }
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.blockNumber !== undefined &&
      (obj.blockNumber = (message.blockNumber || Long.UZERO).toString());
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.txIndex !== undefined &&
      (obj.txIndex = (message.txIndex || Long.UZERO).toString());
    message.blockHash !== undefined && (obj.blockHash = message.blockHash);
    message.index !== undefined &&
      (obj.index = (message.index || Long.UZERO).toString());
    message.removed !== undefined && (obj.removed = message.removed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Log>, I>>(object: I): Log {
    const message = createBaseLog();
    message.address = object.address ?? "";
    message.topics = object.topics?.map((e) => e) || [];
    message.data = object.data ?? new Uint8Array();
    message.blockNumber =
      object.blockNumber !== undefined && object.blockNumber !== null
        ? Long.fromValue(object.blockNumber)
        : Long.UZERO;
    message.txHash = object.txHash ?? "";
    message.txIndex =
      object.txIndex !== undefined && object.txIndex !== null
        ? Long.fromValue(object.txIndex)
        : Long.UZERO;
    message.blockHash = object.blockHash ?? "";
    message.index =
      object.index !== undefined && object.index !== null
        ? Long.fromValue(object.index)
        : Long.UZERO;
    message.removed = object.removed ?? false;
    return message;
  },
};

function createBaseTxResult(): TxResult {
  return {
    contractAddress: "",
    bloom: new Uint8Array(),
    txLogs: undefined,
    ret: new Uint8Array(),
    reverted: false,
    gasUsed: Long.UZERO,
  };
}

export const TxResult = {
  encode(
    message: TxResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.bloom.length !== 0) {
      writer.uint32(18).bytes(message.bloom);
    }
    if (message.txLogs !== undefined) {
      TransactionLogs.encode(message.txLogs, writer.uint32(26).fork()).ldelim();
    }
    if (message.ret.length !== 0) {
      writer.uint32(34).bytes(message.ret);
    }
    if (message.reverted === true) {
      writer.uint32(40).bool(message.reverted);
    }
    if (!message.gasUsed.isZero()) {
      writer.uint32(48).uint64(message.gasUsed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.bloom = reader.bytes();
          break;
        case 3:
          message.txLogs = TransactionLogs.decode(reader, reader.uint32());
          break;
        case 4:
          message.ret = reader.bytes();
          break;
        case 5:
          message.reverted = reader.bool();
          break;
        case 6:
          message.gasUsed = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxResult {
    return {
      contractAddress: isSet(object.contractAddress)
        ? String(object.contractAddress)
        : "",
      bloom: isSet(object.bloom)
        ? bytesFromBase64(object.bloom)
        : new Uint8Array(),
      txLogs: isSet(object.txLogs)
        ? TransactionLogs.fromJSON(object.txLogs)
        : undefined,
      ret: isSet(object.ret) ? bytesFromBase64(object.ret) : new Uint8Array(),
      reverted: isSet(object.reverted) ? Boolean(object.reverted) : false,
      gasUsed: isSet(object.gasUsed)
        ? Long.fromValue(object.gasUsed)
        : Long.UZERO,
    };
  },

  toJSON(message: TxResult): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = message.contractAddress);
    message.bloom !== undefined &&
      (obj.bloom = base64FromBytes(
        message.bloom !== undefined ? message.bloom : new Uint8Array()
      ));
    message.txLogs !== undefined &&
      (obj.txLogs = message.txLogs
        ? TransactionLogs.toJSON(message.txLogs)
        : undefined);
    message.ret !== undefined &&
      (obj.ret = base64FromBytes(
        message.ret !== undefined ? message.ret : new Uint8Array()
      ));
    message.reverted !== undefined && (obj.reverted = message.reverted);
    message.gasUsed !== undefined &&
      (obj.gasUsed = (message.gasUsed || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxResult>, I>>(object: I): TxResult {
    const message = createBaseTxResult();
    message.contractAddress = object.contractAddress ?? "";
    message.bloom = object.bloom ?? new Uint8Array();
    message.txLogs =
      object.txLogs !== undefined && object.txLogs !== null
        ? TransactionLogs.fromPartial(object.txLogs)
        : undefined;
    message.ret = object.ret ?? new Uint8Array();
    message.reverted = object.reverted ?? false;
    message.gasUsed =
      object.gasUsed !== undefined && object.gasUsed !== null
        ? Long.fromValue(object.gasUsed)
        : Long.UZERO;
    return message;
  },
};

function createBaseAccessTuple(): AccessTuple {
  return { address: "", storageKeys: [] };
}

export const AccessTuple = {
  encode(
    message: AccessTuple,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.storageKeys) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessTuple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessTuple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.storageKeys.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AccessTuple {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      storageKeys: Array.isArray(object?.storageKeys)
        ? object.storageKeys.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: AccessTuple): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.storageKeys) {
      obj.storageKeys = message.storageKeys.map((e) => e);
    } else {
      obj.storageKeys = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AccessTuple>, I>>(
    object: I
  ): AccessTuple {
    const message = createBaseAccessTuple();
    message.address = object.address ?? "";
    message.storageKeys = object.storageKeys?.map((e) => e) || [];
    return message;
  },
};

function createBaseTraceConfig(): TraceConfig {
  return {
    tracer: "",
    timeout: "",
    reexec: Long.UZERO,
    disableStack: false,
    disableStorage: false,
    debug: false,
    limit: 0,
    overrides: undefined,
    enableMemory: false,
    enableReturnData: false,
  };
}

export const TraceConfig = {
  encode(
    message: TraceConfig,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tracer !== "") {
      writer.uint32(10).string(message.tracer);
    }
    if (message.timeout !== "") {
      writer.uint32(18).string(message.timeout);
    }
    if (!message.reexec.isZero()) {
      writer.uint32(24).uint64(message.reexec);
    }
    if (message.disableStack === true) {
      writer.uint32(40).bool(message.disableStack);
    }
    if (message.disableStorage === true) {
      writer.uint32(48).bool(message.disableStorage);
    }
    if (message.debug === true) {
      writer.uint32(64).bool(message.debug);
    }
    if (message.limit !== 0) {
      writer.uint32(72).int32(message.limit);
    }
    if (message.overrides !== undefined) {
      ChainConfig.encode(message.overrides, writer.uint32(82).fork()).ldelim();
    }
    if (message.enableMemory === true) {
      writer.uint32(88).bool(message.enableMemory);
    }
    if (message.enableReturnData === true) {
      writer.uint32(96).bool(message.enableReturnData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TraceConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTraceConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tracer = reader.string();
          break;
        case 2:
          message.timeout = reader.string();
          break;
        case 3:
          message.reexec = reader.uint64() as Long;
          break;
        case 5:
          message.disableStack = reader.bool();
          break;
        case 6:
          message.disableStorage = reader.bool();
          break;
        case 8:
          message.debug = reader.bool();
          break;
        case 9:
          message.limit = reader.int32();
          break;
        case 10:
          message.overrides = ChainConfig.decode(reader, reader.uint32());
          break;
        case 11:
          message.enableMemory = reader.bool();
          break;
        case 12:
          message.enableReturnData = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TraceConfig {
    return {
      tracer: isSet(object.tracer) ? String(object.tracer) : "",
      timeout: isSet(object.timeout) ? String(object.timeout) : "",
      reexec: isSet(object.reexec) ? Long.fromValue(object.reexec) : Long.UZERO,
      disableStack: isSet(object.disableStack)
        ? Boolean(object.disableStack)
        : false,
      disableStorage: isSet(object.disableStorage)
        ? Boolean(object.disableStorage)
        : false,
      debug: isSet(object.debug) ? Boolean(object.debug) : false,
      limit: isSet(object.limit) ? Number(object.limit) : 0,
      overrides: isSet(object.overrides)
        ? ChainConfig.fromJSON(object.overrides)
        : undefined,
      enableMemory: isSet(object.enableMemory)
        ? Boolean(object.enableMemory)
        : false,
      enableReturnData: isSet(object.enableReturnData)
        ? Boolean(object.enableReturnData)
        : false,
    };
  },

  toJSON(message: TraceConfig): unknown {
    const obj: any = {};
    message.tracer !== undefined && (obj.tracer = message.tracer);
    message.timeout !== undefined && (obj.timeout = message.timeout);
    message.reexec !== undefined &&
      (obj.reexec = (message.reexec || Long.UZERO).toString());
    message.disableStack !== undefined &&
      (obj.disableStack = message.disableStack);
    message.disableStorage !== undefined &&
      (obj.disableStorage = message.disableStorage);
    message.debug !== undefined && (obj.debug = message.debug);
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    message.overrides !== undefined &&
      (obj.overrides = message.overrides
        ? ChainConfig.toJSON(message.overrides)
        : undefined);
    message.enableMemory !== undefined &&
      (obj.enableMemory = message.enableMemory);
    message.enableReturnData !== undefined &&
      (obj.enableReturnData = message.enableReturnData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TraceConfig>, I>>(
    object: I
  ): TraceConfig {
    const message = createBaseTraceConfig();
    message.tracer = object.tracer ?? "";
    message.timeout = object.timeout ?? "";
    message.reexec =
      object.reexec !== undefined && object.reexec !== null
        ? Long.fromValue(object.reexec)
        : Long.UZERO;
    message.disableStack = object.disableStack ?? false;
    message.disableStorage = object.disableStorage ?? false;
    message.debug = object.debug ?? false;
    message.limit = object.limit ?? 0;
    message.overrides =
      object.overrides !== undefined && object.overrides !== null
        ? ChainConfig.fromPartial(object.overrides)
        : undefined;
    message.enableMemory = object.enableMemory ?? false;
    message.enableReturnData = object.enableReturnData ?? false;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
