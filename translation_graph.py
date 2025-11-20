from langgraph.graph import StateGraph, END
from typing import TypedDict, Optional, Callable


class NodeState(TypedDict):
    text: str
    target_lang: str
    result: Optional[str]
    used_model: Optional[str]


# ------------------ Featherless Node ------------------
def featherless_node(state: NodeState, feather_fn: Callable):
    try:
        out = feather_fn(state["text"], state["target_lang"])
        if out and out.strip():
            return {
                **state,
                "result": out,
                "used_model": "Featherless"
            }
    except Exception as e:
        print("Featherless node error:", e)

    return state


# ------------------ NLLB Node ------------------
def nllb_node(state: NodeState, nllb_fn: Callable):
    try:
        out = nllb_fn(state["text"], state["target_lang"])
        if out and out.strip():
            return {
                "text": state["text"],
                "target_lang": state["target_lang"],
                "result": out,
                "used_model": "NLLB",
            }
    except Exception as e:
        print("NLLB node error:", e)

    return {
        **state,
        "result": None,
        "used_model": None,
    }


# ------------------ Graph Builder ------------------
def build_graph(hf_fn, feather_fn):
    graph = StateGraph(NodeState)

    graph.add_node("featherless", lambda s: featherless_node(s, feather_fn))
    graph.add_node("nllb",       lambda s: nllb_node(s, hf_fn))

    def featherless_router(state: NodeState):
        if state.get("result"):
            return END
        return "nllb"

    graph.add_conditional_edges("featherless", featherless_router)
    graph.add_edge("nllb", END)

    graph.set_entry_point("featherless")
    return graph.compile()


# ------------------ Runner ------------------
def run_translation_graph(text: str, lang: str, hf_fn, feather_fn):
    app = build_graph(hf_fn, feather_fn)

    initial: NodeState = {
        "text": text,
        "target_lang": lang,
        "result": None,
        "used_model": None,
    }

    final = app.invoke(initial)
    return final
