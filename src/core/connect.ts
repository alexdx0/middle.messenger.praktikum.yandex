import { Block, BlockPropsType, RefType } from "@Core/Block";
import { StoreEvents } from "@Core/AppStore";
import { AppStoreModel } from "@models/AppStoreModel";
import { isEqual } from "@utils/isEqual";

export function connect(mapStateToProps: (state: AppStoreModel) => Partial<AppStoreModel>) {
  return function<P extends BlockPropsType, R extends RefType>(Component: typeof Block<P, R>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;
      constructor(props: P) {
        const store = window.appStore;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.appStore.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
