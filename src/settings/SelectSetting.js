import { BaseSetting } from './BaseSetting.js';
import { SettingAction } from './SettingAction.js';
import { SettingIcon } from './SettingIcon.js';

export class SelectSetting extends BaseSetting {
    /**
     * @param {object} props
     * @param {string} props.id
     * @param {string} props.name
     * @param {string} props.description
     * @param {{value:string, label:string}[]} props.optionList
     * @param {*} props.initialValue
     * @param {string[]} props.category
     * @param {SettingAction[]} [props.actionList]
     * @param {SettingIcon[]} [props.iconList]
     * @param {()=>void} [props.onChange]
     */
    static fromProps(props) {
        return Object.assign(new this(), props);
    }





    /**@type {HTMLSelectElement} */ input;
    /**@type {{value:string, label:string}[]} */ optionList = [];

    get value() { return this.input?.value ?? this.initialValue; }
    set value(value) {
        if (this.input) {
            this.input.value = value;
        } else {
            this.initialValue = value;
        }
    }




    render() {
        if (!this.dom) {
            const item = document.createElement('div'); {
                this.dom = item;
                item.classList.add('item');
                const head = document.createElement('div'); {
                    head.classList.add('head');
                    const text = document.createElement('div'); {
                        text.classList.add('text');
                        text.textContent = this.name;
                        head.append(text);
                    }
                    const key = document.createElement('small'); {
                        key.textContent = `#${this.id}`;
                        key.style.fontWeight = 'normal';
                        head.append(key);
                    }
                    const icons = document.createElement('div'); {
                        icons.classList.add('icons');
                        icons.append(...this.iconList.map(it=>it.render()));
                        head.append(icons);
                    }
                    item.append(head);
                }
                const desc = document.createElement('div'); {
                    desc.classList.add('description');
                    desc.innerHTML = this.description;
                    item.append(desc);
                }
                const inp = document.createElement('select'); {
                    this.input = inp;
                    inp.id = `${this.id}`;
                    inp.classList.add('input');
                    inp.classList.add('text_pole');
                    for (const { value, label } of this.optionList) {
                        const opt = document.createElement('option'); {
                            opt.value = value;
                            opt.textContent = label;
                            inp.append(opt);
                        }
                    }
                    inp.value = this.initialValue ?? false;
                    inp.addEventListener('input', ()=>{
                        this.onChange?.(this);
                    });
                    item.append(inp);
                }
                // if (this.actionList?.length) {
                //     const actions = document.createElement('div'); {
                //         actions.classList.add('actions');
                //         actions.append(...this.actionList.map(it=>it.render()));
                //         item.append(actions);
                //     }
                // }
            }
        }
        return this.dom;
    }
}
