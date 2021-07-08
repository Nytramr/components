export class Serializer {
  static stringify(obj) {
    const instance = new Serializer();
    return instance.stringify(obj);
  }

  constructor() {
    this.references = new Map();
    this['replacer'] = this.replacer.bind(this);
  }

  serialize(obj) {
    const type = (typeof obj).toString();

    const name = obj.constructor ? obj.constructor.name : 'Null';

    return `${type} ${name}`;
  }

  replacer(_, value) {
    const type = (typeof value).toString();
    if (type === 'object') {
      if (this.references.has(value)) {
        return this.references.get(value);
      }
      const name = value.constructor.name;

      switch (name) {
      }
    }
    return value;
  }

  stringify(obj) {
    return JSON.stringify(obj, this.replacer);
  }
}
