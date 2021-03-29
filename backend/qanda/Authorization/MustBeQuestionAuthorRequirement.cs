using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace qanda.Authorization
{
    public class MustBeQuestionAuthorRequirement : IAuthorizationRequirement
    {
        public MustBeQuestionAuthorRequirement()
        {

        }
    }
}
