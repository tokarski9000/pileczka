import Layout from "@/Layouts/Layout.jsx";
import {useForm} from "@inertiajs/react";
import InputError from "@/Elements/InputError/InputError.jsx";

export default function Index({auth, players}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name:"",
        last_name:"",
        nick_name:"",
    });

    const createPlayer = (e) => {
        e.preventDefault();
        post(route('player.create'), {
            onSuccess: () => reset('nick_name', 'last_name', 'first_name')
        });
    }

    return (
        <Layout auth={auth}>

            <article>
                <header> Create a player.</header>
                <form onSubmit={createPlayer}>
                    <label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder='First name'
                            value={data.first_name}
                            autoComplete="first_name"
                            onChange={(e) => setData('first_name', e.target.value)}
                            aria-invalid={errors.first_name ? true : null}
                        />
                        <InputError>{errors.first_name}</InputError>
                    </label>
                    <label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder='Last name'
                            value={data.last_name}
                            autoComplete="last_name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            aria-invalid={errors.last_name ? true : null}
                        />
                        <InputError>{errors.last_name}</InputError>
                    </label>
                    <label>
                        <input
                            id="nick_name"
                            type="text"
                            name="nick_name"
                            placeholder='Nickname'
                            value={data.nick_name}
                            autoComplete="nick_name"
                            onChange={(e) => setData('nick_name', e.target.value)}
                            aria-invalid={errors.nick_name ? true : null}
                        />
                        <InputError>{errors.nick_name}</InputError>
                    </label>
                    <button type={"submit"}>Create player</button>
                </form>
            </article>
            <article>
                <header>Players</header>
                {
                    players && players.map((player, index) => (
                        <div key={index}>
                            {player.first_name} {player.last_name}
                        </div>
                    ))
                }

            </article>
        </Layout>
    )
}