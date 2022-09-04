import { Sub } from '../models';

interface IProps {
    subs: Sub[];
}

const List = ({ subs }: IProps) => {
    const renderList = (): JSX.Element[] => {
        return subs.map((sub, idx) => {
            return (
                <li key={idx}>
                    <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
                    <h4>
                        {sub.nick}
                        <small>({sub.subMonths})</small>
                    </h4>
                    <p>{sub.description?.substring(0, 100)}</p>
                </li>
            );
        });
    };

    return <ul>{renderList()}</ul>;
};

export default List;
