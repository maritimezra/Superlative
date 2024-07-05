import strawberry
from apps.accounts.schema import (
    Query as AccountsQuery,
    Mutation as AccountsMutation,
)
from apps.superlative.schema import (
    Query as SuperlativeQuery,
    Mutation as SuperlativeMutation,
)


@strawberry.type
class Query(AccountsQuery, SuperlativeQuery):
    pass


@strawberry.type
class Mutation(AccountsMutation, SuperlativeMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)
